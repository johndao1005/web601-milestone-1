const {Order,User} = require('../models/user');
const asyncHandler = require('express-async-handler'); 

//ANCHOR Working with ORDER
//get all the order
const getOrder = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(302).json(orders)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//get order for using the email for user
const findOrderbyEmail = asyncHandler(async(req, res) => {
    try {
        //get the user id from current user
        const currentUser = await User.findById(req.params.id)
        //query to find the order with the current id
        const order = await Order.find({email:currentUser.email});  
        res.status(302).json(order)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

// find order by Id
const findOrderbyId = asyncHandler(async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(302).json(order)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//update order status
const updateOrderStatus = asyncHandler( async(req, res) => {
    try {
        // find order with Order Id and set new data with req.body
        const updatedOrder = await Order.updateOne({_id:req.params.id},{$set:{state:req.body.state}},{upsert:true})
        //return code 200 and print udpated order
        res.status(205).json({message:"Update complete",updatedOrder})
    } catch (e) {
        console.error(e);
        res.status(200).json({ message: "server error" })
    }
})

//Search all the products as admin
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

const deleteOrder = async(req, res) => {
    try {
        const {confirm} = req.body
        if(confirm == "Yes"){
            const deleteUser = await Order.deleteOne({ _id: req.params.id })
        res.status(410).json({message:"Delete successfully"})}
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    findOrderbyId,
    findOrderbyEmail,
    getOrder,
    updateOrderStatus,
    searchOrder,
    deleteOrder
}