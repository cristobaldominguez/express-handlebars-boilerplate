import express from 'express'

// Router Creation
const router = express.Router()

// body-parser -> From Express 4.16+
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

// Routes
router.get('/', (req, res) => {
    res.render('index', { layout: 'main', title: 'Hello World', text: 'Hola Mundo' })
})

router.get("*", (req, res) => {
    res.render('404', { title: 'Oh no! a 404 :(' })
})

export default router
