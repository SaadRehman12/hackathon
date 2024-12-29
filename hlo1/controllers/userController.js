const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const doSignup = async (req, res) => {
    try {
        console.log('req.body received', req.body);
        if (!req.body?.password) {
            return res.json({
                data: [],
                status: "error",
                error: "Password is required"
            });
        }
        const hash = bcrypt.hashSync(req.body.password, 8);
        console.log('hash', hash);
        const newUser = new User({
            name: req.body?.name,
            email: req.body?.email,
            password: hash,
        });

        const output = await newUser.save();
        res.json({
            data: output,
            status: "success"
        });

    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error.message
        });
    }
};
const doLogin = async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt for:", email);  // Check what email is received

    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found with email:", email);  // Add logging to confirm this step
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user });
};


module.exports = { doSignup, doLogin };