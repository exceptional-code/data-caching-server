// const { Client } = require('pg');
const Client = require('odbc');
// const DB_NAME = 'crosspointe_db';
// const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const DB_SERVER = process.env.DB_SERVER;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `Driver={ODBC Driver 17 for SQL Server};Server=${DB_SERVER};Database=${DB_DATABASE};Uid=${DB_USER};Pwd=${DB_PASSWORD};`;


// const client = new Client({
//     connectionString: DB_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
const client = odbc.connect(DB_URL);

module.exports = client;