var express = require('express')
var app = express();
var body_parser = require('body-parser');

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

// to do
app.get("/todos", function(request, response, next){
  var title = "ToDo List";
  var query = "SELECT * FROM task WHERE task.done=FALSE";
  db.any(query)
    .then(function(results){
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
