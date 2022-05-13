import express from 'express'

// Router Creation
const router = express.Router()

import { home_main } from '../controllers/main_controller.js'

// Routes
router.get('/', home_main)

export default router
