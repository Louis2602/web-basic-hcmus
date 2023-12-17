require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { create } = require('express-handlebars');

const CustomError = require('./modules/custom_err');

const app = express();
const port = process.env.PORT || 21337;
const localhost = process.env.HOST;

const hbs = create({ extname: '.hbs' });
const SECRET_KEY = process.env.SECRET_KEY;

app.use('/pid', express.static('pid'));
app.use('/views', express.static('views'));
app.use(express.static('public'));

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(SECRET_KEY));
app.use(
	session({
		secret: SECRET_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			maxAge: 180 * 60 * 1000,
		},
	})
);

require('./modules/passport')(app);

app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	res.locals.isLogged = req.session?.passport?.user ? true : false;
	res.locals.session = req.session;
	next();
});

app.get('/', (req, res) => {
	if (!req.session.user) {
		return res.redirect('/auth/signin');
	}
	res.render('home', {
		title: 'Home',
		isLogged: req.session.user ? true : false,
	});
});

const userRoutes = require('./routers/user.route');
const categoriesRoutes = require('./routers/categories.route');
const messageRoutes = require('./routers/message.route');

app.use('/auth', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/message', messageRoutes);

// Handling invalid routes
app.use((req, res, next) => {
	res.status(404).render('error', {
		code: 404,
		msg: 'Page not found',
		description: 'The page you’re looking for doesn’t exist.',
	});
});

// Handling custom errors
app.use((err, req, res, next) => {
	const statusCode = err instanceof CustomError ? err.statusCode : 500;
	res.status(statusCode).render('error', {
		code: statusCode,
		msg: 'Server error',
		description: err.message,
	});
});
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let socketsConnected = new Set();

io.on('connection', onConnected);

server.listen(port, () => {
	console.log(`HTTP Server is running on: http://${localhost}:${port}`);
});

function onConnected(socket) {
	console.log(socket.id);
	socketsConnected.add(socket.id);

	io.emit('clients-total', socketsConnected.size);

	socket.on('disconnect', () => {
		console.log('Socket disconnected', socket.id);
		socketsConnected.delete(socket.id);
		io.emit('clients-total', socketsConnected.size);
	});

	socket.on('message', (data) => {
		socket.broadcast.emit('chat-message', data);
	});

	socket.on('feedback', (data) => {
		socket.broadcast.emit('feedback', data);
	});
}
