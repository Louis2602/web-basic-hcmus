const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const conferenceRoutes = require('./routes/conferenceRoutes');
app.use('/', conferenceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on: http://localhost:${PORT}`);
});
