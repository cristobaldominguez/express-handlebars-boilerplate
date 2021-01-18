const { port } = require('./config')
const express = require('express')

// Routes
const mainRoutes = require('./routes/main')

// Server
const app = express()
app.use(mainRoutes)

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
