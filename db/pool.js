import pg from 'pg'
import { db as pg_connection } from '../config.js'

const { Pool } = pg
const pool = new Pool(pg_connection)

export default pool