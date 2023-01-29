const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
// attach socket to http server
const io = socketio(server);
// create a new connection 
io.on('connection', (socket) => {
  console.log('We had a new connection');
  socket.on('disconnect', () => {
    console.log('User had left');
  })
})

app.use(router);
server.listen(PORT, () => console.log('Server started'));
