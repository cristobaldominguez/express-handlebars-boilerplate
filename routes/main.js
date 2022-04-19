import express from 'express'

// Router Creation
const router = express.Router()

// Routes
router.get('/', (req, res) => {
    res.render('index', { layout: 'main', title: 'Hello World', text: 'Hola Mundo' })
})

export default router
