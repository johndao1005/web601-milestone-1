const express = require("express")
const router = express.Router();
const {
    editQuantity,
    getCart,
    confirmOrder,
    deleteItem
} = require("../../controller/cartController")

//desc get the cart relate to current user
//route get /cart/:id
//access user
//status working
//need user email for req/params
router.get('/:email', getCart)

//desc delete a product incart
//route post /cart/delete/:email
//access user
//status 
//need user email for req/params
router.post('/delete/:email', deleteItem)

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