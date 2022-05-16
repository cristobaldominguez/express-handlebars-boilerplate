import express from 'express'

// Router Creation
const router = express.Router()

import { home_main_controller } from '../controllers/main_controller.js'

// Routes
router.get( '/', home_main_controller )

export default router
