import express from 'express'

// Import Controllers
import { authenticate, set_user } from '../controllers/auth_controller.js'
import example_controller from '../controllers/example_controller.js'

// Router Creation
const router = express.Router()

// Routes
// GET /example/
router.get( '/', authenticate, set_user, example_controller.get_index )

export default router
