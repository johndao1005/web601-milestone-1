const express = require("express")
const router = express.Router();
const {
    getAllUsers,
    findUser,
    updateUser,
    deleteUser,
    searchOrder
} = require("../../controller/usersController")
    //the function is in the controller folder


//desc, get all products
//route get /api/products
//access public
//status: working
router.get('/user', getAllUsers)

//desc, get a product by id from db
//route get /api/products/:id
//access public
//status: working
//need user id
router.get('/user/:id', findUser)

//desc, get a product by id from db
//route get /api/products/:id
//access public
//status: working
// need user id and new data in req.body
router.post('/update/:id', updateUser)

//desc, get a product by id from db
//route get /api/products/:id
//access public
//status: working
//need user id
router.post('/delete/:id', deleteUser)

//desc, get a product by id from db
//route get /api/products/:id
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