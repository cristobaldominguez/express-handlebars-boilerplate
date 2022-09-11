import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// ErrorHandling
import AuthError from '../errors/auth_error.js'

const accessTokenSecret = process.env.SECRET_KEY

// Methods
// POST /auth/signup
async function signup_auth(req, res) {
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
        res.status(200).send({ token: token })

    } catch (error) {
        throw new Error()
    }
}

// POST /auth/login
async function login_auth(req, res) {
    const email = req.sanitize(req.body.email)
    const { password } = req.body
    const user = await get_user_by({ email })

    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            const token = jwt.sign(user, accessTokenSecret)
            res.status(200).send(token)

        } else {
            throw new AuthError({ message: 'Invalid Password', status: 400 })
        }

    } else {
        throw new AuthError({ message: 'User does not exist', status: 401 })
    }
}

// Middleware
function authenticate_jwt(req, res, next) {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) return res.redirect('/unauthorized')

            req.user = user
            next()
        })

    } else {
        res.redirect('/unauthorized')
    }
}

export {
    signup_auth,
    login_auth,
    authenticate_jwt
}