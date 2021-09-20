const express = require("express")
const router = express.Router();
const {
    addItem,
    getProductById,
    
} = require("../../controller/productsController")
    //the function is in the controller folder


//desc add an item to cart
//route get /product/add/:id
//access public
//status: working
//need user id for params and product details for req.body
router.post('/add/:id' , addItem)

//desc, get a product by id from db
//route get /products/:id
//access public
//status: working
router.get('/:id', getProductById)

module.exports = router