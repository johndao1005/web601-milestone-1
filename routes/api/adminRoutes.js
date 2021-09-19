const express = require("express")
const router = express.Router();
//ANCHOR get all controller
const {
    getAllUsers,
    findUser,
    updateUser,
    deleteUser,
    searchOrder,
} = require("../../controller/usersController")

const {
    getOrder,
    findOrderbyId,
    updateOrderStatus,
    //searchOrder,
} = require("../../controller/orderController")
    
const{} = require("../../controller/productsController")
//ANCHOR start the router

//desc, get all the order
//route get /admin/order
//access admin
//status: working
router.get('/order', getOrder)

//desc get all users in the system
//route get /admin/user
//access admin
//status: working
router.get('/user', getAllUsers)

//desc, get a specific user with user id
//route get /api/products/:id
//access admin
//status: working
//need user id
router.get('/user/:id', findUser)


//desc, get a product by id from db
//route get /order/:id
//access admin
//status: working
//need order id in req.params
router.get('/order/:id', findOrderbyId)


//desc update user details
//route get /admin/updateUser/:id
//access admin
//status: working
//need user id and new data in req.body
router.post('/updateUser/:id', updateUser)


//desc update order status
//route post /admin/updateProduct/:id
//access admin
//status: working
// need order id in req.params and new data in req.body
router.post('/updateProduct/:id', updateOrderStatus)


//desc delete user from database
//route get /admin/delete/:id
//access admin
//status: working
//need user id
router.post('/delete/:id', deleteUser)

//desc, get a product by id from db
//route get /admin/search/
//access admin
//status: working
//need to have filter in req.body
// {
//     "sort":"date",
//     "search":"",
//     "type":0
// }
router.get('/search', searchOrder)

module.exports = router