const { Order, User } = require("../models/user");
const {Product,Cart} = require('../models/product');
const asyncHandler = require('express-async-handler'); 

//get the cart relate to current user
const getCart = asyncHandler(async (req, res) => {
    try {
        const currentCart = await Cart.find({ 
            email: req.params.id,  //req.session.userId
        });
        
        if (currentCart == [] || currentCart.products == []) {
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



// Add increase of decrease the quanity of item in cart
const editQuantity = asyncHandler(async (req, res) => {
    try {
        //get the product name and the change in quantity
        const {product, change} = req.body
        const productLink = `products.${product}`
        // edit the cart data in database
        const currenCart = await Cart.updateOne({email:req.params.email},{$inc:{[productLink]:change}})
        //edit the stock level
        await Product.updateOne({name:product},{$inc:{countInStock:-change}})
        res.status(202).json(await Cart.findOne({email:req.params.email}))
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
        const {products,email,subtotal} = req.body
        // pass data to create an order
        const neworder = await Order.create({
            products:products,
            email:email,
            subtotal:subtotal,
            state:"In progress"}); // the order is added through ":id"
        // remove the current cart
        await Cart.deleteOne({email:email})
        //return the new order
        res.status(202).json({message:"Order created",neworder})
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//FIXME please 
const deleteItem = asyncHandler (async (req, res) => {
    try {
        const product = `product.${req.body.name}`
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,{$set :{[product]:0}}
        )
        await Product.updateOne({ name: req.body.name },)// { $inc: { countInStock: req.body.quantity } })
        res.status(202).json({ message:"Item deleted"})//{message:"Removed Item"})
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})



module.exports = {
    deleteItem,
    editQuantity,   
    getCart,
    confirmOrder
}