import express from 'express'

// Router Creation
const router = express.Router()

import { authenticateJWT } from '../controllers/auth_controller.js'
import { index_example_controller } from '../controllers/example_controller.js'

// Routes
router.get( '/', authenticateJWT, index_example_controller )

export default router
