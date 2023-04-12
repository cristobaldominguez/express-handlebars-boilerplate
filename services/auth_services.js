import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'
import CustomError from '../errors/custom_error.js'

// Import Config
import { redirect, email_regex } from '../config.js'

// DotEnv
const accessTokenSecret = process.env.SECRET_KEY
const cookie_name = process.env.COOKIE_NAME

if (!accessTokenSecret) console.error('Error: No SECRET_KEY inside .env file')
if (!cookie_name) console.error('Error: No COOKIE_NAME inside .env file')

// POST /auth/signup
async function post_signup(req) {
  if (!req.body.email) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.email') }), field: 'fields.email' })
  if (!req.body.password) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.password') }), field: 'fields.password' })
  if (!req.body.password_confirm) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.password_confirm') }), field: 'fields.password_confirm' })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password, password_confirm } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: i18next.t('errors.not_valid', { field: i18next.t('fields.email') }) }) }

  if (!(email && password)) return new AuthError({ message: i18next.t('errors.data_format') })
  if (password !== password_confirm) return new AuthError({ message: i18next.t('errors.no_presence', { first: i18next.t('fields.password'), second: i18next.t('fields.password_confirm') }) })

  // creating a new user
  const user = { email, password }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10)

  // set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt)

  try {
    const saved_user = await create_user(user)
    return generate_token({ user: await saved_user })

  } catch (err) {
    if (err.is_an_error) return req.error = err

    return new CustomError()
  }
}

// POST /auth/login
async function post_login(req) {
  if (!req.body.email) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.email') }) })
  if (!req.body.password) throw new ValidationError({ message: i18next.t('errors.no_presence', { field: i18next.t('fields.password') }) })

  const email = req.sanitize(req.body.email).toLowerCase()
  const { password } = req.body

  if (!email.match(email_regex)) { throw new AuthError({ message: i18next.t('errors.not_valid', { field: i18next.t('fields.email') }) }) }

  const user = await get_user_by({ email })
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (validPassword) {
      return generate_token({ user })

    } else {
      return new AuthError({ message: i18next.t('errors.invalid_email_password'), status: 400 })
    }

  } else {
    return new AuthError({ message: i18next.t('errors.invalid_email_password'), status: 401 })
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

function generate_token({ user }) {
  const token = jwt.sign(user, accessTokenSecret)
  return {
    user: {
      id: user.id,
      email: user.email
    },
    accessToken: token
  }
}

export {
  set_user,
  authenticate,
  generate_token
}

export default { post_signup, post_login }
