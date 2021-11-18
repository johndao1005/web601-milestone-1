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


router.route('/').post(registerUser).get( getAllUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get( userDetail)
  .put( updateUserProfile)
router
  .route('/:id')
  .delete( deleteUser)
  .get( getUserById)
  .put( updateUser)

module.exports = router