const config = require('./config')
const express = require('express')

// Routes
const mainRoutes = require('./routes/main')

// Server
const app = express()
app.use(mainRoutes)

// Server launch
app.listen(config.port, _ => console.log(`Servidor iniciado en http://localhost:${config.port}/`))
