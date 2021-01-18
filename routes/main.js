const { root } = require('../config')
const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/', (req,res) => {
    res.sendFile(path.join(root + '/views/index.html'))
})

router.get("*", (req, res) => {
    res.sendFile(path.join(root + '/views/404.html'))
})

module.exports = router
