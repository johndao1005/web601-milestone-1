require('dotenv').config()
const mongoose = require('mongoose');
//Show the connection state with database connection

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.error("MongoDB connection Failure")
        process.exit(1)
    }
}

module.exports = connectDB;