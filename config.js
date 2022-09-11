import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// dotEnv Config
dotenv.config()

const redirect = {
  after: {
    login: '/',
    logout: '/',
    signup: '/',
  },
  for_unauthorized: '/auth/login'
}

const env_db_config = JSON.parse(process.env.DB_CONFIG)

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))
const db_default_options = {
  host: process.env.DB_HOST || 'localhost',
  // user: 'pg_username',
  // password: 'pg_password',
  // database: 'db_name',
  port: Number(process.env.DB_PORT) || 5432
}

const db = { ...db_default_options, ...env_db_config }

export { port, root, db, redirect }
