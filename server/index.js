const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

io.on('connection', (socket) => {
  console.log('We had a new connection');
  socket.on('disconnect', () => {
    console.log('User had left');
  })
})

app.use(router);
server.listen(PORT, () => console.log('Server started'));
