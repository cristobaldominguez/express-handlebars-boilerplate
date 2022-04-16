import { dirname } from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 3000
const root = dirname(fileURLToPath(import.meta.url))
const db = {
    host: 'localhost',
    user: 'pg-username',
    password: 'pg-password',
    database: 'db-name',
    port: 5432
}

export { port, root, db }
