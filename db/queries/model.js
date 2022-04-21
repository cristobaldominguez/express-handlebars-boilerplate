import pool from '../pool.js'



/* Examples */
/*
async function get_todos() {
  const query = {
    text: `SELECT * FROM todos WHERE active = true order by id`,
    values: []
  }

  try {
    const result = await pool.query(query)
    return result.rows

  } catch (e) {
    console.error(e)
    return e
  }
}


async function get_todo(id) {
  const query = {
    text: `SELECT * FROM todos WHERE id = $1 AND active = true `,
    values: [id]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]

  } catch (e) {
    console.error(e)
    return e
  }
}

async function new_todo(content, done = false) {
  const query = {
    text: `INSERT INTO todos (content, done) VALUES ($1, $2) RETURNING *`,
    values: [content, done]
  }

  try {
    const result = await pool.query(query)
    return result.rows[0]

  } catch (e) {
    console.error(e)
    return e
  }
}

async function update_todo(id, content, done = false) {
  const query = {
    text: `UPDATE todos SET content = $1, done = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
    values: [content, done, id]
  }

  try {
    const result = await pool.query(query)
    return result.rows

  } catch (e) {
    console.error(e)
    return e
  }
}

async function delete_todo(id) {
  const query = {
    text: `UPDATE todos SET active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
    values: [id]
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
  get_todo,
  get_todos,
  new_todo,
  update_todo,
  delete_todo
}
*/