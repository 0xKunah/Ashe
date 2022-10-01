export const encryption_key = "ashe_secret_encryption_key"
export const api_secret = "ashe_secret_api_key"

// At the moment, MySQL is the only one being supported
export const database_type = "mysql2"

// Notice that database configuration may change if you change database type
// Check knex.js docs to see how to configure properly
export const databaseOptions = {
    host: 'host_url',
    user: 'db_username',
    password: 'db_password',
    database: 'db_name',
    port: 3306
};

export const api_port = 3333