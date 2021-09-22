const express = require("express")
const router = express.Router();
const {
    editQuantity,
    getCart,
    confirmOrder
} = require("../../controller/cartController")

//desc get the cart relate to current user
//route get /cart/:id
//access user
//status working
//need user id for req/params
router.get('/:id', getCart)

//desc confirm the order from cart
//route post /cart/confirm/:id
//access user
//status working 
//need the cart id in req/params
router.post('/confirm/:id', confirmOrder)

//desc, confirm the order from cart
//route post /cart/change
//access user
//FIXME status: not working 
//need user email in req.params
router.post('/change/:email', editQuantity)

module.exports = router