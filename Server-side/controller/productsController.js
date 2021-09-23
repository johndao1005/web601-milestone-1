const {Product,Cart} = require('../models/product');
const asyncHandler = require('express-async-handler'); 

//Working with Product
const updateProductAvailability = asyncHandler( async(req, res) => {
    try {
        await Product.updateOne({_id:req.body.id},{$set:{"availability":req.body.status}})
        res.status(205).json({message:"Update successfully"})
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

//adding item to cart
// ANCHOR still need to work on checking the availability and stock level
const addItem =  asyncHandler( async (req, res) => {
    try {
        const checkCart = await Cart.findOne({email: req.params.email})
        const currentProduct = await Product.findOne({name: req.body.name},{countInStock: 1,availability:1})
        if(currentProduct.countInStock <1 || currentProduct.availability == false){
            res.status(404).json({ message: "product is unavailable"})
        }
        else if (!checkCart) {
            const {name,price} = req.body
            newCart = await Cart.create({
                email:  req.params.email,
                products:{
                    [name] : 1
                },
                subtotal:price
            })
            await Product.updateOne({name: req.body.name},{$inc:{countInStock:-1}})
            res.status(201).json({message:"New cart is created"})
        } else {
            const field = `products.${req.body.name}`
            const currentCart = await Cart.updateOne(
                {email: req.params.email},
                {$inc:{[field]:1,subtotal:req.body.price}}
            )
            await Product.updateOne({name: req.body.name},{$inc:{countInStock:-1}})
            res.status(205).json(await Product.findOne({name: req.body.name}))
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "add item error" })
    }
})

const editProduct = asyncHandler( async(req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id:req.params.id},{$set:req.body},{upsert:true})
        res.status(205).json(updatedProduct)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})


//Listing all the current product 
const getAllProducts = async(req, res) => {
    try {
        const productList = await Product.find({});
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
        res.status(302).json(currentProduct)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

// Add a new product to the DB
const addNewProduct = async(req, res) => {
    try {
        const newProduct = await Product.updateOne({name:req.body.name},{$set:req.body},{upsert:true})// the product is added through ":id"
        res.status(201).json(newProduct)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
}

// Delete product
const deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await Product.deleteOne({_id: req.params.id});
        res.status(410).json({message: "Delete successful",deletedProduct})
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