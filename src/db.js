const {Pool} = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'comenius12',
    database: 'postgres',
    port: '5432',
});
module.exports = {
    query: (text, params, callback) => pool.query(text, params, callback),
};