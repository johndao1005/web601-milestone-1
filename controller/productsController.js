const Product = require('../models/product');
const asyncHandler = require('express-async-handler'); 
const { Cart, Order, User } = require("../models/user");

//Working with Product
const updateProductAvailability = asyncHandler( async(req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id:req.body.id},{$set:{"availability":req.body.status}})
        res.status(200).json({message:"Update successfully"})
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//adding item to cart
// ANCHOR still need to work on checking the availability and stock level
const addItem = async (req, res) => {
    try {
        const currentProduct = await Product.find({name: req.body.name})
        const {email,} = await User.findById( req.params.id)
        const checkCart = await Cart.find({email: email})
        if(currentProduct.countInStock <1 || currentProduct.availability == false){
            res.status(500).json({ message: "product is unavailable"})
        }
        if (!checkCart) {
            const {name,price} = req.body
            newCart = await Cart.create({
                email: email,
                products:{
                    [name] : 1
                },
                subtotal:[price]
            })
            await Product.updateOne({name: req.body.name},{$inc:{countInStock:-1}})
            res.status(200).json({message:`${newCart.email}`})
        } else {
            const field = `products.${req.body.name}`
            const currentCart = await Cart.updateOne(
                {email: email},
                {$inc:{[field]:1,subtotal:req.body.price}}
            )
            await Product.updateOne({name: req.body.name},{$inc:{countInStock:-1}})
            res.status(201).json(currentCart)
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "add item error" })
    }
}

const editProduct = asyncHandler( async(req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id:req.params.id},{$set:req.body},{upsert:true})
        res.json(updatedProduct)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})


//Listing all the current product 
const getAllProducts = async(req, res) => {
    try {
        const productList = await Product.find({});
        res.render("../views/pages/index", { products: products });
        res.status(200).json(productList)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

//Finding 1 product with id
const getProductById = async(req, res) => {
    try {
        const currentProduct = await Product.findById(req.params.id); // the product is added through ":id"
        res.status(200)
        res.render("../views/pages/productDetail", {
            title: "Product Detail",
            product: product,
          });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

// Add a new product to the DB
const addNewProduct = async(req, res) => {
    try {
        const newProduct = await Product.create(req.body); // the product is added through ":id"
        res.redirect("/admin/products");
        res.json(newProduct)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

// Delete product
const deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await Product.deleteOne({id: req.params.id});
        res.status(204).json({message: "Delete successful"})
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

module.exports = {
    addItem,
    getProductById,
    getAllProducts,
    addNewProduct,
    editProduct,
    updateProductAvailability,
    deleteProduct,
    
}