import express from 'express'

// Import Controllers
import main_controller from '../controllers/main_controller.js'

// Router Creation
const router = express.Router()

// Routes
// GET /
router.get('/', main_controller.get_home)

// GET /unauthorized
router.get('/unauthorized', main_controller.get_unauthorized)

// GET /404
router.get('/404', main_controller.get_404)

export default router
