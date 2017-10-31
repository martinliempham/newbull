var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Messages = require('./models/index');


// var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres://martinpham@localhost:5432/newbull');

var app = express();

//pug/html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//css
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


//gets user input from index.pug
app.get('/', function(req, res){
	Messages.findAll().then(function(rows){
		console.log(rows)
		res.render('index',{Messages:rows});
	})
})


app.get('/new', function(req, res){
	res.render('new');

})


app.post('/new', function(req, res){
	Messages
		.sync()
		.then(function(){
			Messages.create({
				title: req.body.title,
				body: req.body.body
			});
		res.redirect('/')
	});
})

app.listen(process.env.PORT || 3000, function() {
	console.log("Your server is available at localhost:3000!");
	});














