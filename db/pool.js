require('@dotenvx/dotenvx').config();
const { Pool } = require("pg");

const pool = new Pool({
    /* connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    } */
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: 5432,
});

module.exports = pool;
