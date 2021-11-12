const { Product, Cart } = require('../models/product');
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

//adding item to cart
// ANCHOR still need to work on checking the availability and stock level
const addProduct = asyncHandler(async (req, res) => {
    try {
        const checkCart = await Cart.findOne({ email: req.params.email })
        const currentProduct = await Product.findOne({ name: req.body.name }, { countInStock: 1, availability: 1 })
        if (currentProduct.countInStock < 1 || currentProduct.availability == false) {
            res.status(404).json({ message: "product is unavailable" })
        }
        else if (!checkCart) {
            const { name, price } = req.body
            newCart = await Cart.create({
                email: req.params.email,
                products: {
                    [name]: 1
                },
                subtotal: price
            })
            await Product.updateOne({ name: req.body.name }, { $inc: { countInStock: -1 } })
            res.status(201).json({ message: "New cart is created" })
        } else {
            const field = `products.${req.body.name}`
            const currentCart = await Cart.updateOne(
                { email: req.params.email },
                { $inc: { [field]: 1, subtotal: req.body.price } }
            )
            await Product.updateOne({ name: req.body.name }, { $inc: { countInStock: -1 } })
            res.status(205).json(await Product.findOne({ name: req.body.name }, { name: 1, countInStock: 1 }))

        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "add item error" })
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
    try {
        const productList = await Product.find();
        const numberofProducts = await Product.find().count()
        res.status(200).json(productList)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
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
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
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
    addProduct,
    getProductById,
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    searchProduct,
    // updateProductAvailability in progress
}