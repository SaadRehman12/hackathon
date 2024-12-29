const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDb;