const { root } = require('../config')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// Router Creation
const router = express.Router()

// body-parser
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

// Routes
router.get('/', (req,res) => {
    res.sendFile(path.join(root + '/views/index.html'))
})

router.get("*", (req, res) => {
    res.sendFile(path.join(root + '/views/404.html'))
})

module.exports = router
