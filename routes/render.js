const express = require("express")
const router = express.Router();

const {
  searchProduct,
  getProductById,
  getAllProducts,
} = require("../controller/userRoutes")
  //the function is in the controller folder


  const {User, Order,Cart} = require('../models/user')
  const Product = require('../models/product')
  
// pages
const createProductPage = async (req, res) => {
    res.render("../views/pages/admin/createProduct.pug");
};
const updateProductPage = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      res.render("../views/pages/admin/updateProduct.pug", { product: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};


// chek if the current session is belonged to an user if not make go to login page
const createLoginPage = async (req, res) => {
  session = req.session;
  if (session.userId) {
  res.redirect("/");
  } else {
  res.render("pages/login", { title: "Login" });
  }
};

// if log out destroy session and redirect back home page
const Logout = async(req, res) => {
  req.session.destroy();
  res.redirect("/");
};


//Register page
const createRegisterPage = async (req, res) => {
  res.render("pages/register", { title: "Register" });
};

router.get("/logout",Logout)
router.get("/register",createRegisterPage )
router.get("/login",createLoginPage)
router.get("/",createProductPage)
router.get("/updatePage/:id", updateProductPage);
// router.get("/cart",createCartPage)
// router.get("/order/user",createOrderPage)


module.exports = router