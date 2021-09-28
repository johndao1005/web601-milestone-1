// connect to DB then det the models details of products
require('dotenv').config()

const { MongoClient } = require('mongodb')

const connectDB = require("./config/db")

const productsData = require("./data/productsData")
const {Product,Cart} = require("./models/product")

const {User,Order} = require("./models/user")
const usersData = require("./data/usersData")
const cartsData = require("./data/cartsData")
const ordersData = require("./data/ordersData")

connectDB();


//demonstrate CRUD
//Testing local data export to cloud data base
//Delete and Create
const importuser = async() => {
    try {
        await User.deleteMany({})

        await User.insertMany(usersData)
    } catch (e) {
        console.error(`Error with user import ${e}`)
        process.exit(1)
    }
}

// Print all the products database
//READ 
const importProducts = async() => {
    try {
        const productList = await Product.find({})
        // process.exit()
    } catch (e) {
        console.error(`Error with product import ${e}`)
        process.exit(1)
    }
}

//update remote database
//UPDATE
const updateUser = async(currentName, newName) => {
    try {
        await User.updateOne({ firstName: currentName }, { $set: { firstName: newName } }, { upsert: true })
        const updatedUser = await User.find({ firstName: newName })
        // process.exit()
    } catch (e) {
        console.error(`Exit program due to error ${e} `)
        process.exit(1)
    }
}

const importData = async() => {
    try {
        await Cart.deleteMany({})
        
        await Order.deleteMany({})

        await User.deleteMany({})

        await Product.deleteMany({})

        await Cart.insertMany(cartsData)


        await Order.insertMany(ordersData)

        await User.insertMany(usersData)

        await Product.insertMany(productsData)

        process.exit(0)

    } catch (e) {
        console.error(`Error with user import ${e}`)
        process.exit(1)
    }
}
importData()
// importProducts()
// importuser()
// updateUser("John", "Kimmy")