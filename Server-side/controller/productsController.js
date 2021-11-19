const Product = require('../models/product');
const asyncHandler = require('express-async-handler');

//Working with Product
// const updateProductAvailability = asyncHandler(async (req, res) => {
//     const product = await Product.findByIdAndUpdate([req.params.id],{})

// })

//search product
const searchProduct = asyncHandler(async (req, res) => {
    // getting email and password details from req body
    const { search, sort, type } = req.body;
    if (search !== "") {
        const aggregate = []
        const regex = new RegExp(search, "i")
        if (type == 0 || type == "name") { aggregate.push({ $match: { name: { $regex: regex } } }) }
        if (type == "category") { aggregate.push({ $match: { category: { $regex: regex } } }) }
        if (sort != 0) { aggregate.push({ $sort: { price: sort } }) }
        const products = await Product.aggregate(aggregate)
        if (products) {
            res.json(products)
        } else {
            res.status(400)
            throw new Error('No match products')
        }
    } else {
        const products = await Product.find({})
        res.status(302).json(products)
    }
})

const editProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


//Listing all the current product 
const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})


// const getProducts = asyncHandler(async (req, res) => {
//     const pageSize = 10
//     const page = Number(req.query.pageNumber) || 1

//     const keyword = req.query.keyword
//       ? {
//           name: {
//             $regex: req.query.keyword,
//             $options: 'i',
//           },
//         }
//       : {}

//     const count = await Product.countDocuments({ ...keyword })
//     const products = await Product.find({ ...keyword })
//       .limit(pageSize)
//       .skip(pageSize * (page - 1))

//     res.json({ products, page, pages: Math.ceil(count / pageSize) })
//   })



//Finding 1 product with id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// Add a new product to the DB
const addNewProduct = asyncHandler(async (req, res) => {
    const {name,
        price,
        imageUrl,
        availability,
        category,
        description,
        countInStock} = req.body
    const product = new Product({
        name,
        price,
        imageUrl,
        availability,
        category,
        description,
        countInStock
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


module.exports = {
    getProductById,
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    searchProduct,
    // updateProductAvailability in progress
}