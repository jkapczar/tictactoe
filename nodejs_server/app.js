var express = require('express');
var app = express();
const http = require('http');
var server = require('http').createServer(app).listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);
var randomstring = require("randomstring");

io.set('log level', 3);

io.sockets.on('connection', function(socket) {

  console.log('client connected: ', socket.id);

  socket.on('message', function(data) {
    console.log('id: ' + socket.id + ' message:' + data);
    io.emit('message', {clientid: socket.id, msg:data});
  });  

  socket.on('disconnect', function() {
	  console.log('disconnect', socket.id);
  });
});
