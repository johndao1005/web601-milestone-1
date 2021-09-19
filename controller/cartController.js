const { Cart, Order, User } = require("../models/user");
const Product = require('../models/product');
const asyncHandler = require('express-async-handler'); 

//get the cart relate to current user
const getCart = asyncHandler(async (req, res) => {
    try {
        // if (!req.session.userId) {
        //     res.status(400).json({ message: "No user Id" });
        // }
        const {email,} = await User.findById( req.params.id)
        const currentCart = await Cart.find({ 
            email: email,  //req.session.userId
        });
        
        if (!currentCart) {
            res.status(200).json({message: "Empty cart"})
        } 
        else if (currentCart !== [] ) {
            res.render("../views/pages/cart", { cartitems: cartItems });
        } 
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})


// update total price after every action
const updateTotal = asyncHandler(async (req, res) => {
    try {
        const {products} = await Cart.findOne({
            email:req.body.email
        })
        let total = 0
        for ( const quantity in products){
            const {price} = await Product.findOne({name:item})
            total += parseFloat(price)* parseInt(products[quantity])
        }
        const request = await Cart.updateOne({email:req.body.email},{$set:{subtotal:total}})
        res.status(200).json(request)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "update error" })
    }
})

//FIXME
// Add a new cart to the DB
const editQuantity = asyncHandler(async (req, res) => {
    try {

        const product = `products.${req.body.product}`
        const currenCart = await Cart.updateOne({email:req.body.email},{$inc:{[product]:[req.body.change]}})
        console.log(product)
        res.status(200).json(currentCart)
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
        const {products,email,subtotal,id} = await Cart.findById(req.params.id)
        // pass data to create an order
        const neworder = await Order.create({products,email,subtotal,state:"In progress"}); // the order is added through ":id"
        // remove the current cart
        await Cart.deleteOne({_id:id})
        //return the new order
        res.render("../views/pages/confirm", { products: neworder });
        res.status(200).json(neworder)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

module.exports = {
    updateTotal,
    editQuantity,   
    getCart,
    updateTotal,
    confirmOrder
}