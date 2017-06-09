var express = require("express")
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
app.set("view engine", "hbs");

app.use('/socket-io',
  express.static('node_modules/socket.io-client/dist'));

app.get("/", function(request, response){
  response.render("chat_index.hbs", {title: "Socket.IO chat"});
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('chat message', "New user connected");
  socket.on("disconnect", function(){
    console.log("user disconected");
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(8000, function(){
  console.log("Listening on port 8000");
});
