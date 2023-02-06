const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.all('*', (req, res, next) => {
  throw new Error('Not found');
});
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
})
io.on('connection', (socket) => {
  console.log('We had a new connection');
  socket.on('setup', (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });
  socket.on('join chat', (room) => {
    socket.join(room);
  });
  socket.on('new message', (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) return;
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit('message received', newMessageReceived);
    })
  })
  socket.on('disconnect', () => {
    console.log('User had left');
  })
})

app.use(router);
server.listen(PORT, () => console.log('Server started'));
