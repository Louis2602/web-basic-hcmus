const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.get('/', async (req, res) => {
	try {
		await pool.query(
			'CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, avatar TEXT)'
		);
		console.log('Successfully created users table');
		res.render('homepage');
	} catch (err) {
		console.error(err);
	}
});

const userRoutes = require('./routes/user.route');
app.use('/', userRoutes);

app.listen(port, () => {
	console.log(`Server is running on: http://localhost:${port}`);
});
