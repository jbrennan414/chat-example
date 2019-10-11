var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit("broadcast", socket.id);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg, socket.id);
    console.log("hey fucker")
  });

  socket.on('typing message', function(){
    io.emit('is typing', socket.id)
  })

  socket.on('no longer typing', function(){
    io.emit('done typing', socket.id)
  })

});

http.listen(3000, function(){
  console.log('listening on http://localhost:3000/');
});