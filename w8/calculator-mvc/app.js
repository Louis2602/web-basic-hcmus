const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
	res.render('index', { result: null });
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// router
const calculatorRouter = require('./routes/calculator');

app.use('/calculate', calculatorRouter);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
