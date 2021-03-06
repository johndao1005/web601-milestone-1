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


router.route('/').post(editOrderItems).get(getAllOrders)
router.route('/myorderd').get( getUserOrder)
router.route('/:id').get( findOrderbyId)
router.route('/:id/deliver').put( updateOrderStatus)
router.route('/:id/delete').delete(deleteOrder)

module.exports = router