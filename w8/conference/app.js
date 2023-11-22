const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const conferenceRoutes = require('./routes/conferenceRoutes');
app.use('/', conferenceRoutes);

app.listen(port, () => {
	console.log(`Server is running on: http://localhost:${port}`);
});
