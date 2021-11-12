const express = require("express")
const router = express.Router();
const {
    findOrderbyId,
    findOrderbyEmail,
    getOrder,
    updateOrderStatus,
    updateOrderPaid,
    searchOrder,
    deleteOrder
} = require("../controller/orderController")
const { protect,admin} = require('../middleware/authMiddleware.js')    

//router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myOrders').get(protect, getOrder)
router.route('/:id').get(admin, findOrderbyId)
router.route('/:id/pay').put(protect, updateOrderStatus)
router.route('/:id/deliver').put(protect, admin, updateOrderStatus)
router.route('/:id/delete').delete(protect,admin,updateOrderStatus)

module.exports = router