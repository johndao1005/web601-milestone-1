const { User, Order } = require('../models/user');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const generateToken = require("../utils/generateToken")


//ANCHOR User side 
// Register new users
const registerUser = asyncHandler(async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            res.status(400)
            throw new Error('User Already Exists')
        }
        const user = await User.create(req.body)
        if (user) {
            res.status(201).json({
                user
            })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }

})

//Check user log in
const authUser = asyncHandler(async (req, res) => {
    try {// getting email and password details from req body
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            session = req.session;
            session.userId = __user.id;
            session.userFirstName = __user.firstName;
            res.status(200).json({
                message: `Welcome $ {user.name}`
            })
            res.redirect("/product/home");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

const searchProduct = asyncHandler(async (req, res) => {
    try {// getting email and password details from req body
        const aggregate = []
        const { search, sort, type } = req.body;
        if (search !== "") {
            const regex = new RegExp(search, "i")
            if (type == 0 || type == "name") { aggregate.push({ $match: { name: { $regex: regex } } }) }
            if (type == "category") { aggregate.push({ $match: { category: { $regex: regex } } }) }
            if (sort != 0) { aggregate.push({ $sort: { price: [parseInt(sort)] } }) }
        }
        const products = await Product.aggregate(aggregate)
        res.status(200).json(products)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})



//ANCHOR Admin side
// Working with USER
//get all the users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const userList = await User.find().sort({ name: -1 });
        res.json(userList)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//find 1 user with Id
const findUser = asyncHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id)
        res.json(currentUser)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//FIXME edit user detail
const updateUser = asyncHandler(async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.id }, { $set: req.body }, { upsert: true })
        res.json(updatedUser)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.id })
        res.json(deletedUser)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

const searchOrder = asyncHandler(async (req, res) => {
    try {// getting email and password details from req body
        const aggregate = []
        const { search, sort, type } = req.body;
        if (search !== "") {
            const regex = new RegExp(search, "i")
            if (type == 0 || type == "email") { aggregate.push({ $match: { email: { $regex: regex } } }) }
            if (type == "status") { aggregate.push({ $match: { status: { $regex: regex } } }) }
        }
            if (sort !=0|| sort=="date") { 
                aggregate.push({ $sort: { orderDate: 1} }) 
            }else if (sort == "status") { 
                aggregate.push({ $sort: { state: 1 } }) 
            } 
        const products = await Order.aggregate(aggregate)
        res.status(200).json(products)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})



const customerController = {
    registerUser,
    authUser,
    searchProduct
};

const adminController = {
    findUser,
    getAllUsers,
    updateUser,
    deleteUser,
    searchOrder
};

module.exports = {
    ...customerController,
    ...adminController,
}; 
