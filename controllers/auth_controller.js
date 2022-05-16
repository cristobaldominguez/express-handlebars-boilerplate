import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Import Queries
import { create_user, get_user_by } from '../db/queries/users.js'

// Methods
// POST /auth/signup
async function signup_auth(req, res) {
    const { email, password } = req.body

    if (!(email && password)) {
        return res.status(400).send({ error: "Data not formatted properly" })
    }

    // creating a new user
    const user = { email, password }

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10)

    // now we set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt)

    try {
        const saved_user = await create_user(user)
        const token = jwt.sign(await saved_user, process.env.SECRET_KEY)
        res.status(200).send(token)

    } catch (error) {
        res.status(500).send({ error: '500 Internal Server Error', message: error })
    }
}

// POST /auth/login
async function login_auth(req, res) {
    const { email, password } = req.body
    const user = await get_user_by({ email })

    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password)

        if (validPassword) {
            const token = jwt.sign(user, process.env.SECRET_KEY)
            res.status(200).send(token)

        } else {
            res.status(400).json({ error: "Invalid Password" })
        }

    } else {
        res.status(401).json({ error: "User does not exist" })
    }
}

export {
    signup_auth,
    login_auth
}