var express = require('express')
var app = express();
var body_parser = require('body-parser');
var session = require('express-session')

var promise = require("bluebird");
var pgp = require('pg-promise')({
  promiseLib: promise
  // initialization options
});

var db = pgp({database: 'tododb'});
// nodemon for server

// imports body-parser
app.use(body_parser.urlencoded({extended: false}));

// imports hbs
app.set("view engine", "hbs");

// handles static files
app.use("/static", express.static("public"));

app.use(session({
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
}));

app.use(function(request, response, next){
  if (request.session.user){
    next();
  } else if (request.path == "/login"){
    next();
  } else {
    response.redirect("/login");
  }
});

app.get('/login', function (request, response) {
  response.render('login.hbs');
});
app.post('/login', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username == 'aaron' && password == 'narf') {
    request.session.user = username;
    response.redirect('/todos');
  } else {
    response.render('login.hbs');
  }
});

// to do
app.get("/todos", function(request, response, next){
  var title = "ToDo List";
  var query = "SELECT * FROM task WHERE task.done=FALSE";
  db.any(query)
    .then(function(results){
      console.log(results);
      response.render("todos.hbs", {results: results});
    })
    .catch(next);
});

app.get("/todos/add", function(request, response){
  response.render("add.hbs", {title: "add"});
});

app.post("/submit", function(request, response, next){
  var query = "INSERT INTO task VALUES(default, ${description}, FALSE)";
  var add = {description: request.body.description};
  db.result(query, add)
    .then(function(){
      response.redirect("/todos");
    })
    .catch(next);
})

app.get("/todos/done/:id", function(request, response, next){
  var id = request.params.id;
  var del = {id: id};
  var query = "DELETE FROM task WHERE id=${id}";
  db.result(query, del)
    .then(function(){
      response.redirect("/todos");
    })
    .catch(next);
})


app.listen(8000, function(){
  console.log("Listening on port 8000");
});
