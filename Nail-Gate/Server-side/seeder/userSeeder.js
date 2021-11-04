require('dotenv').config()
const connectDB = require("../config/db")
const {User} = require("../models/user")
const userData = require("../data/usersData")

connectDB();

const importData = async() => {
    try {
        await User.deleteMany({})
        await User.insertMany(userData)
        console.log('Import success')
        process.exit(0)

    } catch (e) {
        console.error(`Error with user import ${e}`)
        process.exit(1)
    }
}

importData()
