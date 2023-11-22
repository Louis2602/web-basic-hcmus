const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'mvc-postgresql',
	password: '111223',
	port: 5432,
});

module.exports = pool;
