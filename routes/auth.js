import express from 'express'

// Import Controllers
import auth_controller from '../controllers/auth_controller.js'

// Router Creation
const router = express.Router()

// Routes
// /auth/signup
router.route('/signup')
  .get(auth_controller.get_signup)
  .post(auth_controller.post_signup)

// /auth/login
router.route('/login')
  .get(auth_controller.get_login)
  .post(auth_controller.post_login)

// /auth/logout
router.route('/logout')
  .delete(auth_controller.delete_logout)

export default router
