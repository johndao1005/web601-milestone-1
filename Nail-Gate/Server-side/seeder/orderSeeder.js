require('dotenv').config()
const connectDB = require("../config/db")
const {Order} = require("../models/user")
const ordersData = require("../data/ordersData")

connectDB();

const importData = async() => {
    try {
        await Order.deleteMany({})
        await Order.insertMany(ordersData)
        console.log('Import success')
        process.exit(0)

    } catch (e) {
        console.error(`Error with user import ${e}`)
        process.exit(1)
    }
}

importData()
