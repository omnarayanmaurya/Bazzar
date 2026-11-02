import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare entered password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        else{
            // Generate JWT
        const token = createToken(user._id);

        // Send successful response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
        }

        

    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "An error occurred during login"
        });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking whether the user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        // Checking password strength
        if (!password || password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a password with at least 8 characters"
            });
        }

        // Hashing the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Saving the user in MongoDB
        const user=await newUser.save();
        const token=createToken(user._id)
        

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "An error occurred during registration"
        });
    }
};

// Route for user admin login
const adminLogin = async (req, res) => {
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credential"})
        }
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { loginUser, adminLogin, registerUser };