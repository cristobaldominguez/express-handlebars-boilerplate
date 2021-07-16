const { port } = require('./config')
const express = require('express')
const handlebars  = require('express-handlebars')

// Routes
const mainRoutes = require('./routes/main')

// Server
const app = express()
app.use(mainRoutes)

// Handlebars
app.set('view engine', '.hbs')
app.engine('.hbs', handlebars({extname: '.hbs'}))

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
