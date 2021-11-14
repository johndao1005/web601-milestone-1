const express = require("express")
const router = express.Router();
const {
    findOrderbyId,
    getUserOrder,
    getAllOrders,
    updateOrderStatus,
    searchOrder,
    editOrderItems,
    deleteOrder
} = require("../controller/orderController")
const { protect,admin} = require('../middleware/authMiddleware.js')    

router.route('/').post(protect, editOrderItems).get(protect, admin, getAllOrders)
router.route('/myorderd').get(protect, getUserOrder)
router.route('/:id').get(admin, findOrderbyId)
router.route('/:id/deliver').put(protect, admin, updateOrderStatus)
router.route('/:id/delete').delete(protect,admin,deleteOrder)

module.exports = router