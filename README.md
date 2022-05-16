# Node/Express Boilerplate

Please feel free to use this boilerplate, just consider to use this configuration in your `.env` file:

- Create a JWT secret key
- The db configuration needs an object but cannot use an object inside .env file, so you will have to use a JSON object interpreted inside the config.js file.

This is a copy of my .env file:

````
DB_CONFIG = '{ "database": "db_name", "user": "pg_username", "password": "pg_password" }'
SECRET_KEY = ""
````