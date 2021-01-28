module.exports = {
    port: process.env.PORT || 3000,
    root: __dirname,
    db: {
        host: 'localhost',
        user: 'pg-username',
        password: 'pg-password',
        database: 'db-name',
        port: 5432
    }
}
