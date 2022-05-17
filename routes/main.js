import express from 'express'

// Router Creation
const router = express.Router()

import { home_main_controller, unauthorized_main_controller } from '../controllers/main_controller.js'

// Routes
router.get( '/', home_main_controller )
router.get( '/unauthorized', unauthorized_main_controller )

export default router
