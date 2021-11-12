const express = require("express")
const router = express.Router();
const {
    deleteItem,
    editQuantity,
    getCart,
    confirmOrder
} = require("../controller/cartController")

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
router.post('/confirm', confirmOrder)

//desc, confirm the order from cart
//route post /cart/change
//access user
//status working 
//need user email in req.params
router.post('/change/:email', editQuantity)

//desc, confirm the order from cart
//route post /cart/delete/:id
//access user
//need cart id req.params and product name and quantity in req.body
router.delete('delete/:id',deleteItem)

module.exports = router