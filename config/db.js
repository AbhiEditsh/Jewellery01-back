const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

async function DbConnection() {
    const mongoURI = process.env.MONGO_CONNECT;
    if (!mongoURI) {
        console.error("MongoDB URI is missing in environment variables.");
        return;
    }

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully😃");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = DbConnection;
