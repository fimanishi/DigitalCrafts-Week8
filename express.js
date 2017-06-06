var express = require('express')
var app = express();

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

// GET Query Parameters

app.get("/hello", function(request, response){
  var name = request.query.name || "World";
  response.send("Hello " + name);
});

app.listen(8000, function(){
  console.log("Listening on port 8000");
});
