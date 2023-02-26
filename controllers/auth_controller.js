// Import Config
import { redirect } from '../config.js'

// Import Services
import auth_services from '../services/auth_services.js'

// DotEnv
const cookie_name = process.env.COOKIE_NAME

// Methods
// GET /auth/signup
function get_signup(_, res) {
  res.render('auth/signup')
}

// POST /auth/signup
async function post_signup(req, res) {
  const token = await auth_services.post_signup(req, res)

  if (req.expects_html) {
    if (token.is_an_error) return res.status(req.error.status).render('auth/signup', { error: req.error.toJson(), user: { email: req.body.email } })

    res.cookie(cookie_name, token.accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.redirect(redirect.after.signup)
  }

  if (token.is_an_error) throw token

  res.status(200).json(token)
}

// GET /auth/login
async function get_login(_, res) {
  res.render('auth/login')
}

// POST /auth/login
async function post_login(req, res) {
  const token = await auth_services.post_login(req, res)

  if (req.expects_html) {
    if (token.is_an_error) return res.status(req.error.status).render('auth/login', { error: req.error.toJson(), user: { email: req.body.email } })

    res.cookie(cookie_name, token.accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.redirect(redirect.after.login)
  }

  if (token.is_an_error) throw token

  res.status(200).json(token)
}

// DELETE /auth/logout
function delete_logout(_, res) {
  res.clearCookie(cookie_name)
  res.redirect(redirect.after.logout)
}

export default {
  get_signup,
  post_signup,
  get_login,
  post_login,
  delete_logout
}
