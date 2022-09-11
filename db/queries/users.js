import pool from '../pool.js'

// User Creation
async function create_user({ email, password }) {
  const query = {
    text: `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
    values: [email, password]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]

  } catch (e) {
    console.error(e)
    return e
  }
}

async function get_user_by(obj) {
  // Maps every key/value into array of strings and then into string
  const query_str = Object.entries(obj).map(arr => `${arr[0]} = '${arr[1]}'`).join(', ')

  const query = {
    text: `SELECT * FROM users WHERE ${query_str} AND active = true `
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]

  } catch (e) {
    console.error(e)
    return e
  }
}

export {
  create_user,
  get_user_by
}
