import { port } from './config.js'
import express from 'express'
import handlebars from 'express-handlebars'

// Routes
import mainRoutes from './routes/main.js'

// Server
const app = express()
app.use(mainRoutes)

// Handlebars
app.set('view engine', '.hbs')
app.engine('.hbs', handlebars({ extname: '.hbs' }))

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
