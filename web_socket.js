var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use('/socket-io',
  express.static('node_modules/socket.io-client/dist'));

app.set("view engine", "hbs");

app.get("/", function (request, response){
  response.render("chat.hbs");
});

// Connection
io.on("connection", function(client){
  console.log("Connected");

  client.on("disconnect", function(){
    console.log("EXITED");
  });

  // client.on("incoming", function(msg){
  //   io.emit("chat-msg", msg);
  //   // io sends message to the server (everyone), client sends only to the client that submitted it
  // });

  client.on("join-room", function(room){
    client.join(room, function(){
      console.log(client.rooms);
      io.to(room).emit("chat-msg", "**new user joined**");
    });

    client.on("incoming", function(msg){
      io.to(msg.room).emit("chat-msg", msg.msg);
    });
  });

});
// --------- //

http.listen(8000, function (){
  console.log("Listening on port 8000");
});
