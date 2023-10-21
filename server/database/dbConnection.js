const mongoose = require('mongoose');
require('dotenv').config()

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToDatabase;