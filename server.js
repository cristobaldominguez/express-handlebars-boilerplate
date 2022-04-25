import dotenv from 'dotenv'
import { port } from './config.js'
import express from 'express'
import { engine } from 'express-handlebars'

// Routes
import mainRoutes from './routes/main.js'

// dotEnv Config
dotenv.config()

// Server
const app = express()

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Public Folder
app.use(express.static('public'))

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// App Routes
app.use(mainRoutes)

// 404 Page
app.get("*", (req, res) => {
    res.render('404', { title: 'Oh no! a 404 :(' })
})

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
