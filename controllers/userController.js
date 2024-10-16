const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const generateToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign({ id: user._id, email: user.email, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
    const { username, email, password, fullname, phone, role, permissions, department } = req.body;

    try {
     
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ error: "User already exists." });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            fullname,
            phone,
            role,
            permissions,
            department
        });

        const savedUser = await user.save();
        res.status(201).json({
            message: "User registered successfully",
            userId: savedUser._id,
            success: true
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
 
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid email.");

  
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send("Invalid password.");

     
        const token = generateToken(user);

        res.status(200).json({
            message: "Login Successfully",
            token,
            id: user._id,
            email: user.email,
            role: user.role
        });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: err.message
        });
    }
};

const updateUsers = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, fullname, phone } = req.body;

    try {
        const updateData = { username, email, fullname, phone };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to update user",
            error: err.message
        });
    }
};

const deleteUsers = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete user",
            error: err.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUsers,
    deleteUsers
};
