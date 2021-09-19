const express = require("express")
const router = express.Router();
const {
    findOrderbyEmail
} = require("../../controller/orderController")
    
//the function is in the controller folder

//desc, get all the order by id of user
//route get /order/user/:id
//access public
//status: working
//need user id in req.params
router.get('/user/:id', findOrderbyEmail)


module.exports = router