require('dotenv').config()
const connectDB = require("../config/db")
const Product = require("../models/product")
const productsData = require("../data/productsData")

connectDB();

const importData = async() => {
    try {
        await Product.deleteMany()
        await Product.insertMany(productsData)
        console.log('Import success')
        process.exit(0)
    } catch (e) {
        console.error(`Error with user import ${e}`)
        process.exit(1)
    }
}

importData()
