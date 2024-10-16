const { Client } = require('pg');
const DB_NAME = 'crosspointe_db';
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

const client = new Client({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;