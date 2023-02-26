import dotenv from 'dotenv'
import { port } from './config.js'
import express from 'express'
import { engine } from 'express-handlebars'
import expressSanitizer from 'express-sanitizer'
import cookieParser from 'cookie-parser'

// ErrorHandling
import 'express-async-errors'

// Routes
import mainRoutes from './routes/main.js'
import authRoutes from './routes/auth.js'
import exampleRoutes from './routes/example.js'

// Controllers
import { authenticate, set_user } from './services/auth_services.js'

// Middlewares
import errorMiddleware from './middlewares/error_middleware.js'
import acceptsFormatMiddleware from './middlewares/accepts_format_middleware.js'
// Helpers
import { non_existent_route } from './helpers/non_existent_route.js'

// dotEnv Config
dotenv.config()

// Server
const app = express()

// body-parser -> From Express 4.16+
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(cookieParser())

// Request Accepts HTML
app.use(acceptsFormatMiddleware)

// express-sanitizer middleware
app.use(expressSanitizer())

// Public Folder
app.use(express.static('public'))

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// App Routes
app.use(mainRoutes)
app.use('/auth', authRoutes)
app.use('/examples', authenticate, set_user, exampleRoutes)

// Redirect to 404 Page
app.get('*', non_existent_route)

app.use(errorMiddleware)

// Server Running
app.listen(port, _ => console.log(`Server Running at: http://localhost:${port}/`))
