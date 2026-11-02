import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for uploading image buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer);
    });
};

// Function for adding a product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4]
            .filter((item) => item !== undefined);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await uploadToCloudinary(item.buffer);
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product added",
        });

    } catch (error) {
        console.error("Add product error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Product Removed"
        });

    } catch (error) {
        console.error("Remove product error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Function for listing products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});

        res.json({
            success: true,
            products
        });

    } catch (error) {
        console.error("List product error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await productModel.findById(productId);

        res.json({
            success: true,
            product
        });

    } catch (error) {
        console.error("Single product error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export {
    addProduct,
    removeProduct,
    listProduct,
    singleProduct
};