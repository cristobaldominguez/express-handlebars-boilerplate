import express from 'express'

// Import Controllers
import { authenticate } from '../controllers/auth_controller.js'
import { index_example_controller } from '../controllers/example_controller.js'

// Router Creation
const router = express.Router()

// Routes
// GET /example/
router.get( '/', authenticate, index_example_controller )

export default router
