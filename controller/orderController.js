const {Order,Cart,User} = require('../models/user');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler'); 

// Working with ORDER
//get all the order
const getOrder = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
        res.render("../views/pages/orders", { orderitems: orders });
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
        res.render("../views/pages/orders", { orderitems: order });
        res.status(200).json(order)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

// find order by Id
const findOrderbyId = asyncHandler(async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.render("../views/pages/orders", { orderitems: order });
        res.status(200).json(order)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//update order status
//
const updateOrderStatus = asyncHandler( async(req, res) => {
    try {
        // find order with Order Id and set new data with req.body
        const updatedOrder = await Order.updateOne({_id:req.params.id},{$set:{state:req.body.state}},{upsert:true})
        //return code 200 and print udpated order
        res.status(200).json({message:"Update complete"})
    } catch (e) {
        console.error(e);
        res.status(200).json({ message: "server error" })
    }
})




module.exports = {
    findOrderbyId,
    findOrderbyEmail,
    getOrder,
    updateOrderStatus
}