const express = require("express")
const router = express.Router();
const {
    editQuantity,
    getCart,
    confirmOrder,
    updateTotal
} = require("../../controller/cartController")
    //the function is in the controller folder

//desc add an item to cart
//route get /api/cartRoutes
//access public
//status working
//need email in req.body
router.get('/update', updateTotal)

//desc, get all products
//route get /api/cartRoutes
//access user
//status working
//need user id in body
router.get('/:id', getCart)

//desc, confirm the order from cart
//route get /api/cartRoutes
//access user
//status working 
//need the cart id to complete
router.post('/confirm:id', confirmOrder)

//desc, confirm the order from cart
//route get /api/cartRoutes
//access user
//FIXME status: not working 
//need the cart id to complete
router.post('/change', editQuantity)

module.exports = router