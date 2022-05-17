import express from 'express'

// Import Controllers
import { signup_auth, login_auth } from '../controllers/auth_controller.js'

// Router Creation
const router = express.Router()

// Routes
// POST /auth/signup
router.post( '/signup', signup_auth )

// POST /auth/login
router.post( '/login', login_auth )

export default router
