import express from 'express'

// Router Creation
const router = express.Router()

// Import Controllers
import { signup_auth, login_auth } from '../controllers/auth_controller.js'

// Routes
router.post( '/signup', signup_auth )
router.post( '/login', login_auth )

export default router
