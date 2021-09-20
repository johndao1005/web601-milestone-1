const express = require("express")
const router = express.Router();
const {
    registerUser,authUser,searchProduct
} = require("../../controller/usersController")

const {
    findOrderbyEmail
} = require("../../controller/orderController")
    

const {
    getAllProducts
} = require("../../controller/productsController")
    


//desc get all the orders relate to current user
//route get /
//access public
//status: working
//
router.get('/', getAllProducts)


//desc get all the orders relate to current user
//route get /user/order/
//access public
//status: working
// need user id for req.params
router.get('/order/:id', findOrderbyEmail)

//desc authenticate user to check if admin or customers as well as email and encrypted password pair matched
//route get /user/login
//access public
//status: working
// need email and password from req.body
router.post('/login', authUser)

//desc create new user if everything is fine and encrypt the password
//route get /user/register/:id
//access public
//status: working
// need data from req.body
router.post('/register', registerUser)

//desc search the database with user input
//route get /user/search/
//access public
//status: working
//need to have filter in req.body
// {
//     "sort":"date",
//     "search":"",
//     "type":0
// }
router.get('/search', searchProduct)


module.exports = router