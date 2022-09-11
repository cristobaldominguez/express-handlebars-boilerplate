import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Config
import { redirect } from '../config.js'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'

const accessTokenSecret = process.env.SECRET_KEY
const cookie_name = process.env.COOKIE_NAME

// Methods
// GET /auth/signup
function get_signup(_, res) {
  res.render('auth/signup')
}

// POST /auth/signup
async function post_signup(req, res) {
  const email = req.sanitize(req.body.email)
  const { password } = req.body

  if (!(email && password)) {
    throw new AuthError({ message: 'Data not formatted properly' })
  }

  // creating a new user
  const user = { email, password }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt)

  try {
    const saved_user = await create_user(user)
    const token = jwt.sign(await saved_user, accessTokenSecret)

    if (req.accepts('text/html')) {
      res.cookie(cookie_name, token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.redirect(redirect.after.signup)
    }

    res.status(200).json({ token })

  } catch (error) {
    throw new Error()
  }
}

// GET /auth/login
async function get_login(_, res) {
  res.render('auth/login')
}

// POST /auth/login
async function post_login(req, res) {
  const email = req.sanitize(req.body.email)
  const { password } = req.body
  const user = await get_user_by({ email })

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      const token = jwt.sign(user, accessTokenSecret)

      if (req.accepts('text/html')) {
        res.cookie(cookie_name, token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.redirect(redirect.after.login)
      }

      res.status(200).json({ token })

    } else {
      throw new AuthError({ message: 'Invalid Password', status: 400 })
    }

  } else {
    throw new AuthError({ message: 'User does not exist', status: 401 })
  }
}

// DELETE /auth/logout
function delete_logout(_, res) {
  res.clearCookie(cookie_name)
  res.redirect(redirect.after.logout)
}

// Middleware
function authenticate(req, res, next) {
  const cookies = req.cookies[cookie_name]
  const jwt_auth = req.headers.authorization

  // Get token
  const token = cookies ? cookies : jwt_auth ? get_token_from_jwt(jwt_auth) : null
  if (!token) return res.redirect(redirect.for_unauthorized)

  // Verify token
  jwt.verify(cookies, accessTokenSecret, (err, _) => {
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

export default {
  get_signup,
  post_signup,
  get_login,
  post_login,
  delete_logout
}
