import 'dotenv/config';
import dns from 'node:dns';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from '../config/mongodb.js';
import connectCloudinary from '../config/cloudinary.js';
import productModel from '../models/productModel.js';
import { products } from './productData.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageFolder = path.resolve(__dirname, '../import-assets');

// Find products imported by the previous script
const findLegacyProduct = (product) => productModel.findOne({
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category,
    subCategory: product.subCategory,
    sizes: product.sizes,
    bestseller: Boolean(product.bestseller),
    date: Number(product.date),
    sourceId: { $exists: false }
});

const runImport = async () => {
    let importedCount = 0;
    let skippedCount = 0;

    try {
        await connectDB();
        await connectCloudinary();

        console.log(`Existing products in database: ${await productModel.countDocuments()}`);
        console.log(`Products in import file: ${products.length}`);

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const sourceId = String(product._id);

            console.log(`\n[${i + 1}/${products.length}] Checking: ${product.name} (${sourceId})`);

            // Check duplicate using original product ID
            const alreadyImported = await productModel.findOne({ sourceId });

            if (alreadyImported) {
                console.log(`Skipped: source ID ${sourceId} already exists.`);
                skippedCount++;
                continue;
            }

            // Check products imported by the previous version
            const legacyProduct = await findLegacyProduct(product);

            if (legacyProduct) {
                await productModel.updateOne(
                    {
                        _id: legacyProduct._id,
                        sourceId: { $exists: false }
                    },
                    {
                        $set: { sourceId }
                    }
                );

                console.log(`Skipped existing legacy product; linked source ID ${sourceId}.`);
                skippedCount++;
                continue;
            }

            // Upload product images to Cloudinary
            const uploadedImageUrls = [];

            for (const imageName of product.image) {
                const imagePath = path.join(
                    imageFolder,
                    path.basename(imageName)
                );

                const result = await cloudinary.uploader.upload(imagePath, {
                    folder: 'bazzar/products'
                });

                uploadedImageUrls.push(result.secure_url);
            }

            // Save product in MongoDB
            await productModel.create({
                sourceId,
                name: product.name,
                description: product.description,
                price: Number(product.price),
                image: uploadedImageUrls,
                category: product.category,
                subCategory: product.subCategory,
                sizes: product.sizes,
                bestseller: Boolean(product.bestseller),
                date: Number(product.date)
            });

            importedCount++;

            console.log(`Imported successfully: ${product.name}`);
        }

        console.log('\nBulk import finished.');
        console.log(`New products imported: ${importedCount}`);
        console.log(`Existing products skipped: ${skippedCount}`);

    } catch (error) {
        console.error('Bulk import failed:', error);
        process.exitCode = 1;

    } finally {
        await mongoose.disconnect();
    }
};

runImport();