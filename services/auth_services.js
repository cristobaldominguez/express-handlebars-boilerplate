import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'

// Import Config
import { redirect } from '../config.js'

// DotEnv
const accessTokenSecret = process.env.SECRET_KEY
const cookie_name = process.env.COOKIE_NAME

// POST /auth/signup
async function post_signup(req) {
  const email = req.sanitize(req.body.email)
  const { password, password_confirm } = req.body

  if (!(email && password)) throw new AuthError({ message: 'Data not formatted properly' })
  if ( password !== password_confirm ) throw new AuthError({ message: 'Password and password confirm fields doesn\'t match' })

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

  } catch (error) {
    throw new Error()
  }
}

// POST /auth/login
async function post_login(req) {
  const email = req.sanitize(req.body.email)
  const { password } = req.body
  const user = await get_user_by({ email })

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      const token = jwt.sign(user, accessTokenSecret)
      return token

    } else {
      throw new AuthError({ message: 'Invalid Password', status: 400 })
    }

  } else {
    throw new AuthError({ message: 'User does not exist', status: 401 })
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
