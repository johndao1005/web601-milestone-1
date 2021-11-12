const express = require("express")
const router = express.Router();
const {
    deleteItem,
    editQuantity,
    getCart,
    confirmOrder
} = require("../controller/cartController")

const { protect, admin } =require('../middleware/authMiddleware.js')
router.get('/:id', getCart)
router.post('/confirm', confirmOrder)
router.post('/change/:email', editQuantity)
router.delete('delete/:id',deleteItem)

module.exports = router