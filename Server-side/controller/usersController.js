const { User, Order } = require('../models/user');
const {Product} = require('../models/product');
const asyncHandler = require('express-async-handler');
//TODO add JWT token to user
const generateToken = require("../utils/generateToken")

var session
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//ANCHOR User side 
// Register new users
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { email, DOB, name, password} = req.body;
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(400).json({ message:'User Already Exists'})
        } else if (password.length <7) {
            res.status(400).json({ message:'Password Is Incorrect'})
        } else if (!re.test(email.trim())) {
            res.status(400).json({ message:'Email Is Invalid'})
        }else{
            const newUser = await User.create(req.body)
            res.status(201).json({message: "User is created successfully"})           
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Register fail" })
    }

})

//Check user log in
const authUser = asyncHandler(async (req, res) => {
    try {// getting email and password details from req body
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (user && (await user.matchPassword(password))) {
            session = req.session;
            req.session.email = email;
            if (user.isAdmin == true) {
                req.session.type = "Admin"
                res.status(2002).json({
                    message: `Welcome Admin ${user.name}`
                })
                console.log("Admin")
            }else {
                req.session.type = "Customer";
                res.status(202).json({
                    message: `Welcome ${user.name}`
                })
                console.log("User")
            }
        } else {
            res.status(406).json({ message: "Invalid username/password" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Login error" })
    }
})

const searchProduct = asyncHandler(async (req, res) => {
    try {
        // getting email and password details from req body
        const { search, sort, type } = req.body;
        if (search !== "") {
            const aggregate = []
            const regex = new RegExp(search, "i")
            if (type == 0 || type == "name") { aggregate.push({ $match: { name: { $regex: regex } } }) }
            if (type == "category") { aggregate.push({ $match: { category: { $regex: regex } } }) }
            if (sort != 0) { aggregate.push({ $sort: { price: sort} }) }
            const products = await Product.aggregate(aggregate)
            res.status(302).json(products)
        } else {
            const products = await Product.find({})
            res.status(302).json(products)
        }
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Search error" })
    }
})



//ANCHOR Admin side
// Working with USER
//get all the users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const userList = await User.find({}).sort({ name: -1 });
        res.status(200).json(userList)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Get user error" })
    }
})

//find 1 user with Id
const findUser = asyncHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id)
        res.status(302).json(currentUser)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "find user error" })
    }
})


// delete user
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ _id: req.params.id })
        res.status(410).json(deletedUser)
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
        if (sort != 0 || sort == "date") {
            aggregate.push({ $sort: { orderDate: 1 } })
        } else if (sort == "status") {
            aggregate.push({ $sort: { state: 1 } })
        }
        const products = await Order.aggregate(aggregate)
        res.status(302).json(products)
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
    deleteUser,
    searchOrder
};

module.exports = {
    ...customerController,
    ...adminController,
}; 
