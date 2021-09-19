const express = require("express")
const router = express.Router();
const {
    editQuantity,
    getCart,
    confirmOrder,
    updateTotal
} = require("../../controller/cartController")

//desc update the subtotal of the cart
//route get /cart/update
//access public
//status working
//need email in req.body
router.get('/update', updateTotal)

//desc get the cart relate to current user
//route get /cart/:id
//access user
//status working
//need user id for req/params
router.get('/:id', getCart)

//desc confirm the order from cart
//route get /cart/confirm/:id
//access user
//status working 
//need the cart id in req/params
router.post('/confirm/:id', confirmOrder)

//desc, confirm the order from cart
//route get /api/cartRoutes
//access user
//FIXME status: not working 
//need user email in req.body
router.post('/change', editQuantity)

module.exports = router