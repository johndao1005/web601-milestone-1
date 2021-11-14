const express = require("express")
const router = express.Router();
const {
    registerUser,
    authUser,
    updateUser,
    userDetail,
    getAllUsers,
    deleteUser,
    getUserById,
    updateUserProfile
} = require("../controller/usersController")
const { protect, admin } =require('../middleware/authMiddleware.js')


router.route('/').post(registerUser).get(protect, admin, getAllUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, userDetail)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

module.exports = router