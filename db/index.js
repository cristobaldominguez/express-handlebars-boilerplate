const { Pool } = require('pg')
const { db: pg_connection } = require('../config')

const pool = new Pool(pg_connection)

module.exports = {}
