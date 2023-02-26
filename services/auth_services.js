import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'

// Import Config
import { redirect, email_regex } from '../config.js'

// DotEnv
const accessTokenSecret = process.env.SECRET_KEY
const cookie_name = process.env.COOKIE_NAME

if (!accessTokenSecret) console.error('Error: No SECRET_KEY inside .env file')
if (!cookie_name) console.error('Error: No COOKIE_NAME inside .env file')

// POST /auth/signup
async function post_signup(req) {
  if (!req.body.email) throw new ValidationError({ message: 'Email must to be present.', field: 'email' })
  if (!req.body.password) throw new ValidationError({ message: 'Password must to be present.', field: 'password' })
  if (!req.body.password_confirm) throw new ValidationError({ message: 'Password Confirm must to be present.', field: 'password_confirm' })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password, password_confirm } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: 'Email field have not a valid value.' }) }

  if (!(email && password)) return req.error = new AuthError({ message: 'Data not formatted properly' })
  if (password !== password_confirm) return req.error = new AuthError({ message: 'Password and password confirm fields doesn\'t match' })

  // creating a new user
  const user = { email, password }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt)

  try {
    const saved_user = await create_user(user)
    const token = jwt.sign(await saved_user, accessTokenSecret)
    return token

  } catch (err) {
    if (err instanceof AuthError) { 
      return req.error = err
    }

    return req.error = new Error()
  }
}

// POST /auth/login
async function post_login(req) {
  if (!req.body.email) throw new ValidationError({ message: 'Email must to be present.' })
  if (!req.body.password) throw new ValidationError({ message: 'Password must to be present.' })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: 'Email field have not a valid value.' }) }

  const user = await get_user_by({ email })
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      const token = jwt.sign(user, accessTokenSecret)
      return token

    } else {
      return req.error = new AuthError({ message: 'Invalid email or password', status: 400 })
    }

  } else {
    return req.error = new AuthError({ message: 'Email does not exist', status: 401 })
  }
}

// Middlewares
function authenticate(req, res, next) {
  const cookies = req.cookies[cookie_name]
  const jwt_auth = req.headers.authorization

  // Get token
  const token = cookies ? cookies : jwt_auth ? get_token_from_jwt(jwt_auth) : null
  if (!token) return res.redirect(redirect.for_unauthorized)

  // Verify token
  jwt.verify(token, accessTokenSecret, (err, _) => {
    if (err && cookies) res.clearCookie(cookie_name)
    if (err) return res.redirect(redirect.for_unauthorized)

    req.token = token
    next()
  })
}

function set_user(req, _, next) {
  if (!req.token) return req.user = null

  jwt.verify(req.token, accessTokenSecret, (err, user) => {
    if (err) return req.user = null

    req.user = user
    next()
  })
}

function get_token_from_jwt(bearer) {
  return bearer.split(' ')[1]
}

export {
  authenticate,
  set_user
}

export default { post_signup, post_login }
