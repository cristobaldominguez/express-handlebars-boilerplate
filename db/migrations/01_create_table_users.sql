-- psql -d db_name -a -f db/migrations/01_create_table_users.sql

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL,

    email VARCHAR(75) NOT NULL UNIQUE,
    password VARCHAR(75) NOT NULL,

    active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);
