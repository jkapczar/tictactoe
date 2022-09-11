import { Server } from "socket.io";

const io = new Server(8081, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});





class ServerModel {
  constructor(id, host, members) {
    this.id = id;
    this.host = host;
    this.members = members;
  };
}

let servers = [];
//m = ['fsdr342rfw4'];
//servers.push(new Server('asd','asd', m));

io.sockets.on('connection', function(socket) {

  console.log('client connected: ', socket.id);

  socket.on('init', function(data) {
      console.log("init");
  });

  socket.on('createServer', function(data) {
    //let members = [socket.id];
    //servers.push(new ServerModel(socket.id, data.username, members));
    console.log("create servers");
    //console.log(servers);
  });

  socket.on('getServers', function() {
    //io.clients[socket.id].emit(servers);
    console.log(io.sockets);
    console.log('sending servers: ' + servers);
    io.sockets.connected[socket.id].emit('getServers', servers);
    console.log(socket.clients);
    //io.clients[socket.id]
  });

  socket.on('joinServer', function(data) {
    console.log(data);
    server = servers.find(s => s.id === data.id);
    console.log(server);
    console.log(server.members);
    server.members.push(socket.id);

    console.log(server);
  });

  socket.on('destroyServer', function(data) {
    servers = servers.filter(s => s.id != data.id);
  });




  socket.on('message', function(data) {
    console.log('id: ' + socket.id + ' username: ' + data.username + ' message:' + data.message);
    io.emit('message', {clientid: socket.id, username: data.username, msg:data.message});
  });  

  socket.on('disconnect', function() {
    console.log('disconnect', socket.id);
    io.emit('disconnect', {clientid: socket.id});
  });
});
