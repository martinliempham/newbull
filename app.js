var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Blogs = require('./models/index');


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
	Blogs.findAll().then(function(rows){
		console.log(rows)
		res.render('index',{blogs:rows});
	})
})


app.get('/new', function(req, res){
	res.render('new');

})


app.post('/new', function(req, res){
	Blogs
		.sync()
		.then(function(){
			Blogs.create({
				title: req.body.title,
				body: req.body.body
			});
		res.redirect('/')
	});
})

app.listen(3002, function(){
  console.log('App is listening on port 3002');
});















