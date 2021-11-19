const express = require("express")
const router = express.Router();
const {
    getProductById,
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
} = require("../controller/productsController")
//the function is in the controller folder
const { protect, admin } = require('../middleware/authMiddleware.js')


router.route('/').get(getAllProducts).post( addNewProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete( deleteProduct)
  .put( editProduct)


module.exports = router