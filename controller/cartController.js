const { Order, User } = require("../models/user");
const {Product,Cart} = require('../models/product');
const asyncHandler = require('express-async-handler'); 

//get the cart relate to current user


const  getCart = asyncHandler( async (req, res) => {
    try {
        
        const currentUser = await User.findById(req.params.id)
        console.log(currentUser.getEmail())
        const currentCart = await Cart.findOne({ 
            email: email,  //req.session.userId
        });
        
        if (!currentCart || currentCart == null) {
            res.status(202).json({message: "Empty cart"})
        } 
        else{
            res.status(302).json(currentCart)
        } 
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

// Add a new cart to the DB
const editQuantity = asyncHandler(async (req, res) => {
    try {
        
        const product = `products.${req.body.product}`
        const currenCart = await Cart.updateOne({email:req.body.email},{$inc:{[product]:[req.body.change]}})
        console.log(product)
        
        res.status(202).json({message:"successfully"})
    } catch (e) {
    console.error(e);
    res.status(500).json({ message: "remove error" })
}
})
// Add a new order to the DB
// will read data from the cart then create order
const confirmOrder = asyncHandler(async(req, res) => {
    try {
        //get data from cart
        const {products,email,subtotal,id} = req.body
        // pass data to create an order
        const neworder = await Order.create({products,email,subtotal,state:"In progress"}); // the order is added through ":id"
        // remove the current cart
        await Cart.deleteOne({_id:id})
        //return the new order
        res.status(202).json(neworder)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

module.exports = {
    editQuantity,   
    getCart,
    confirmOrder
}