import { Pool } from 'pg'
import { db as pg_connection } from '../config'

const pool = new Pool(pg_connection)
