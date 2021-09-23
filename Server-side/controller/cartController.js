const { Order, User } = require("../models/user");
const { Product, Cart } = require('../models/product');
const asyncHandler = require('express-async-handler');

//get the cart relate to current user
const getCart = asyncHandler(async (req, res) => {
    try {
        const currentCart = await Cart.find({
            email: req.params.email,  //req.session.userId
        });

        if (!currentCart || currentCart == null) {
            res.status(202).json({ message: "Empty cart" })
        }
        else {
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
        const { product, change } = req.body
        const productLink = `products.${product}`
        // edit the cart data in database
        const currenCart = await Cart.updateOne({ email: req.params.email }, { $inc: { [productLink]: change } })
        //edit the stock level
        await Product.updateOne({ name: product }, { $inc: { countInStock: -change } })
        res.status(202).json(await Cart.findOne({ email: req.params.email }))
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "remove error" })
    }
})


// Add a new order to the DB
// will read data from the cart then create order
const confirmOrder = asyncHandler(async (req, res) => {
    try {

        //get data from cart
        const { products, email, subtotal, id } = req.body
        //check if cart is Empty
        const currentCart = await Cart.findById(id)
        if (currentCart.products == [] || currentCart.products == null) {
            res.status(400).json({ message: "Can't make order with empty cart" })
        } else {
            // pass data to create an order
            const neworder = await Order.create({ products, email, subtotal, state: "In progress" });
            // remove the current cart
            await Cart.deleteOne({ _id: id })
            //return the new order
            res.status(202).json(neworder)
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

const deleteItem = asyncHandler(async (req, res) => {
    try {

        const updatedCart = await Cart.updateOne({
            email: req.params.email
        },
            { $pull: { products: { name: req.body.product } } }
        )
        await Product.updateOne({ name: req.body.product }, { $inc: { countInStock: req.body.quantity } })
        res.status(202).json(await Cart.findOne({ email: req.params.email }))//{message:"Removed Item"})
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