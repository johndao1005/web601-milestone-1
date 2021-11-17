const { Order, User } = require('../models/user');
const asyncHandler = require('express-async-handler');

//ANCHOR Working with ORDER
//get all the order
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate('user', 'id name');
    res.json(orders)
})

//get order for using the email for user
const getUserOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// find order by Id
const findOrderbyId = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//update order delivery status
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
    order.delivery = true
    const updatedOrder = await order.save()
    res.json(updatedOrder)
    } else {
    res.status(404)
    throw new Error('Order not found')
    }
})

//Search all the products as admin
const searchOrder = asyncHandler(async (req, res) => {
    try {// getting email and password details from req body
        const aggregate = []
        const { search, sort, type } = req.body;
        if (search !== "") {
            const regex = new RegExp(search, "i")
            if (type == 0 || type == "email") { aggregate.push({ $match: { email: { $regex: regex } } }) }
            if (type == "status") { aggregate.push({ $match: { status: { $regex: regex } } }) }
        }
        if (sort != 0 || sort == "date") {
            aggregate.push({ $sort: { orderDate: 1 } })
        } else if (sort == "status") {
            aggregate.push({ $sort: { state: 1 } })
        }
        const products = await Order.aggregate(aggregate)
        res.status(302).json(products)
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "server error" })
    }
})

const deleteOrder = asyncHandler(async (req, res) => {
            const deleteOrder = await Order.deleteOne({ _id: req.params.id })
            res.status(410).json({ message: "Delete successfully" })
})

const editOrderItems = asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    }
  })
  

module.exports = {
    findOrderbyId,
    getUserOrder,
    getAllOrders,
    updateOrderStatus,
    searchOrder,
    deleteOrder,
    editOrderItems
}