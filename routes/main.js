const express = require('express')
const bodyParser = require('body-parser')

// Router Creation
const router = express.Router()

// body-parser
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// Routes
router.get('/', (req,res) => {
    res.render('index', { layout: 'main', title: 'Hello World', text: 'Hola Mundo' })
})

router.get("*", (req, res) => {
    res.render('404', {title: 'Oh no! a 404 :('})
})

module.exports = router
