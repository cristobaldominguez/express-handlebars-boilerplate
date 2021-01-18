const { port } = require('./config')
const express = require('express')

// Routes
const mainRoutes = require('./routes/main')

// Server
const app = express()
app.use(mainRoutes)

// Server launch
app.listen(port, _ => console.log(`Servidor iniciado en http://localhost:${port}/`))
