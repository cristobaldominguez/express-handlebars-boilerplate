const config = require('../config')
const express = require('express')
const path = require('path')

const router = express.Router()

router.use('/', (req,res,next) => {
    console.log(req)

    next()
})

router.get('/', (req,res) => {
    res.sendFile(path.join(config.root + '/views/index.html'))
})

router.get("*", (req, res) => {
    res.sendFile(path.join(config.root + '/views/404.html'))
})

module.exports = router
