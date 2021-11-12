const express = require("express")
const router = express.Router();
const {
    addProduct,
    getProductById,
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
} = require("../controller/productsController")
//the function is in the controller folder
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/').get(getAllProducts).post(protect, admin, addNewProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, editProduct)


module.exports = router