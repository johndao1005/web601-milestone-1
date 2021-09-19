const express = require("express")
const router = express.Router();
const {
    registerUser,authUser,searchProduct
} = require("../../controller/usersController")

//desc, get all products
//route get /api/products
//access public
//status: working
router.post('/login', authUser)

//desc, get a product by id from db
//route get /api/products/:id
//access public
//status: working
router.post('/register', registerUser)

//desc, get a product by id from db
//route get /api/products/:id
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