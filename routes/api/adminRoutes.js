const express = require("express")
const router = express.Router();
//ANCHOR get all controller
const {
    getAllUsers,
    findUser,
    updateUser,
    deleteUser,
    searchOrder
} = require("../../controller/usersController")

const {
    getOrder,
    findOrderbyId,
    updateOrderStatus,
    //searchOrder,
} = require("../../controller/orderController")
    
const{
    deleteProduct,
    addNewProduct,
    editProduct,
    updateProductAvailability,
} = require("../../controller/productsController")
//ANCHOR start the router

//ANCHOR Working with Users

//desc update user details
//route get /admin/updateUser/:id
//access admin
//status: working
//need user id and new data in req.body
router.post('/updateUser/:id', updateUser)

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

//desc delete user from database
//route get /admin/deleteUser/:id
//access admin
//status: working
//need user id
router.post('/deleteUser/:id', deleteUser)

//ANCHOR Working with Orders

//desc, get all the order
//route get /admin/order
//access admin
//status: working
router.get('/order', getOrder)

//desc get a order by id from db
//route get /order/:id
//access admin
//status: working
//need order id in req.params
router.get('/order/:id', findOrderbyId)

//desc update order status
//route post /admin/updateProduct/:id
//access admin
//status: working
// need order id in req.params and new data in req.body
router.post('/updateProduct/:id', updateOrderStatus)

//desc, search order 
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

//ANCHOR Working with products

//desc delete product from database
//route get /admin/deleteProduct/:id
//access admin
//status: working
//need product id for req.params
router.delete('/deleteProduct/:id', deleteProduct )


//desc add new product to databse
//route get /admin/new
//access admin
//status: working
//need product details in req.body
router.post('/new', addNewProduct)

//desc edit products details
//route get /admin/product/edit/:id
//access admin
//status: working
//need product id in req.params and product details in req.params
router.get('/product/edit/:id', editProduct)

//desc update product availability
//route get /admin/product/update
//access admin
//status: working
//sample body input 
// {"id":"614418d624e849c7ccd69b22",
// "status":false}
router.post('/product/update', updateProductAvailability)



module.exports = router