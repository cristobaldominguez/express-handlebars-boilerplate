import express from 'express'

// Import Controllers
import { home_main_controller, unauthorized_main_controller } from '../controllers/main_controller.js'

// Router Creation
const router = express.Router()

// Routes
// GET /
router.get( '/', home_main_controller )

// GET /unauthorized
router.get( '/unauthorized', unauthorized_main_controller )

export default router
