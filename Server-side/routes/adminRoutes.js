const express = require("express")
const router = express.Router();
//ANCHOR get all controller
const {
    getAllUsers,
    deleteUser,
    getUserById
} = require("../controller/usersController")

const {
    deleteOrder,
    getOrder,
    findOrderbyId,
    updateOrderStatus,
    searchOrder,
} = require("../controller/orderController")
    
const{
    getAllProducts,
    deleteProduct,
    addNewProduct,
    editProduct,
    searchProduct
} = require("../controller/productsController")
//ANCHOR start the router

//ANCHOR Working with Users

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
router.get('/user/:id', getUserById)

//desc delete user from database
//route get /admin/deleteUser/:id
//access admin
//status: working
//need user id
router.delete('/deleteUser/:id', deleteUser)

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

//desc delete user from database
//route get /admin/deleteUser/:id
//access admin
//status: working
//need order id
router.delete('/deleteOrder/:id', deleteOrder)


//desc update order status
//route post /admin/updateProduct/:id
//access admin
//status: working
// need order id in req.params and new data in req.body
router.post('/updateOrder/:id', updateOrderStatus)

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
router.get('/order/search', searchOrder)

//ANCHOR Working with products

//desc, get all the product
//route get /admin/product
//access admin
//status: working
router.get('/product', getAllProducts)


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
router.post('/product/edit/:id', editProduct)


//desc edit products details
//route get /admin/product/edit/:id
//access admin
//status: working
//need product id in req.params and product details in req.params
router.post('/product/search/', searchProduct)

//desc update product availability
//route get /admin/product/update
//access admin
//status: working
//sample body input 
// {"id":"614418d624e849c7ccd69b22",
// "status":false}
//router.post('/product/:id/:status', updateProductAvailability)

module.exports = router