const pgp = require('pg-promise')({
	capSQL: true,
});

const cn = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
};

const db = pgp(cn);

module.exports = db;
