const express = require("express")
const router = express.Router();


const {
    findUser,
    registerUser, 
    authUser, 
    searchProduct,
    updateUser
} = require("../controller/usersController")

const {
    findOrderbyEmail
} = require("../controller/orderController")


const {
    getAllProducts
} = require("../controller/productsController")



//desc get all the orders relate to current user
//route get /
//access public
//status: working
//
router.get('/', getAllProducts)


//desc get all the orders relate to current user
//route get /order/:id
//access public
//status: working
// need user id for req.params
router.get('/order/:id', findOrderbyEmail)

//desc authenticate user to check if admin or customers as well as email and encrypted password pair matched
//route post /login
//access public
//status: working
// need email and password from req.body
router.post('/login', authUser)

//desc create new user if everything is fine and encrypt the password
//route post /register/:id
//access public
//status: working
// need data from req.body
router.post('/register', registerUser)

//desc edit the user details
//route post /update/:id
//access user
//status: working
// need data from req.body
router.post('/update/:id', updateUser)


//desc search the database with user input
//route get /search/
//access public
//status: working
//need to have filter in req.body
// {
//     "sort":1,
//     "search":"",
//     "type":0
// }
router.get('/search', searchProduct)

//desc, get a specific user details with user id
//route get /detail/id
//access admin
//status: working
//need user id
router.get('/detail/:id', findUser)


module.exports = router