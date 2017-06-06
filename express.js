var express = require('express')
var app = express();


// imports hbs
app.set("view engine", "hbs");

// handles static files
app.use("/static", express.static("public"));

app.get("/", function(request, response){
  response.send("Hello World");
});

app.get("/about", function(request, response){
  response.send("About me");
});

app.get("/projects", function(request, response){
  response.send("My projects");
});


// URL Parameters
app.get("/post/:slug", function(request,response){
  var slug = request.params.slug;
  response.send("Post about: " + slug);
});

app.get("/greet/:slug", function(request, response){
  var slug = request.params.slug;
  var age = request.query.age;
  var context = {
    age: age,
    name: slug,
    year: 2017 - parseInt(age),
    title: "Hi, " + slug,
  }
  response.render("greet.hbs", context);
})

// GET Query Parameters

app.get("/hello", function(request, response){
  var name = request.query.name || "World";
  var context = {
    title: "Hello",
    name: name,
    friends: [{name: "John", age: 21}, {name:"Terry"}],
    content: "<strong>hello</strong>",
  }
  response.render("hello.hbs", context);
});

app.get("/year", function(request,response){
  var age = request.query.age;
  var context = {
    age: age,
  }
  response.send("You were born in " + (2017-parseInt(age)) + ".");
});

app.get("/fav_animals", function(request, response){
  var context = {
    animals: [
      {name: "cats", favorite: true},
      {name: "dogs", favorite: true},
      {name: "tree frogs", favorite: false},
      {name: "earth worms", favorite: false},
      {name: "guinea pigs", favorite: true},
    ],
  }
  response.render("fav_animals.hbs", context);
})



app.listen(8000, function(){
  console.log("Listening on port 8000");
});
