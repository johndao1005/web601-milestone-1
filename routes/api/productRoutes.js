const express = require("express")
const router = express.Router();
const {
    addItem,
    getProductById,
    getAllProducts,
    addNewProduct,
    editProduct,
    updateProductAvailability,
    deleteProduct
} = require("../../controller/productsController")
    //the function is in the controller folder


//desc add an item to cart
//route get /api/cartRoutes
//access public
//status: working
//need user id for params and product details for req.body
router.get('/add/:id' ,addItem)

//desc, get all products
//route get /api/products
//access public
//status: working
router.get('/', getAllProducts)

//desc, get a product by id from db
//route get /api/products/:id
//access public
//status: working
router.get('/:id', getProductById)

//desc, get all products
//route get /api/products
//access public
//status: working
router.post('/new', addNewProduct)

//desc, get all products
//route get /api/products
//access public
//status: working
router.get('/edit/:id', editProduct)

//desc, get all products
//route get /api/products
//access public
//status: working
router.delete('/delete/:id', deleteProduct )

//desc, get all products
//route get /api/products
//access public
//status: working
//sample body input 
// {"id":"614418d624e849c7ccd69b22",
// "status":false}
router.post('/update', updateProductAvailability)



module.exports = router