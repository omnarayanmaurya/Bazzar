import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import dns from 'node:dns'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
dns.setServers(['8.8.8.8'])

// Create the Express application
const app = express()

// Use the PORT from .env, or 4000 if it isn't configured
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middleware: parse incoming JSON request bodies
app.use(express.json())

// Middleware: enable cross-origin requests
app.use(cors())
//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// API endpoint: respond to GET requests at /
app.get('/', (req, res) => {
    res.send("API is Working")
})

// Start the server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})