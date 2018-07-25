const express = require('express');
const hbs = require('hbs');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));
app.use('/', (req, res, next) => {
	console.log(`Request details: ${req.method} ${req.url}`);
	next();
});

app.get('/', (req, res) => {
	res.render('home', {
		pageTitle: 'Home page',
		welcomeMessage: "Welcome!"
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		pageTitle: 'About'
	});
});

app.get('/bad', (req, res) => {
	res.json({err: 'Unavailable to handle request'});
});

app.listen(port);