require('dotenv').config()
const connectDB = require("../config/db")
const {Cart} = require("../models/product")
const cartsData = require("../data/cartsData")

connectDB();

const importData = async() => {
    try {
        await Cart.deleteMany({})
        await Cart.insertMany(cartsData)
        console.log('Import success')
        process.exit(0)

    } catch (e) {
        console.error(`Error with user import ${e}`)
        process.exit(1)
    }
}

importData()
