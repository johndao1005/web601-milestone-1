const express = require("express")
const router = express.Router();
const {
    findOrderbyId,
    findOrderbyEmail,
    getOrder,
    updateOrderStatus
} = require("../../controller/orderController")
    //the function is in the controller folder


//desc, get all products
//route get /api/products
//access admin
//status: working
router.get('/', getOrder)

//desc, get a product by id from db
//route get /api/products/:id
//access admin
//status: working
//need order id
router.get('/:id', findOrderbyId)

//desc, get a product by id of user
//route get /api/products/:id
//access public
//status: working
//find all orders relate to current user id
router.get('/user/:id', findOrderbyEmail)

//desc, update
//route get /api/products
//access admin
//status: working
// need order id
router.post('/update/:id', updateOrderStatus)


module.exports = router