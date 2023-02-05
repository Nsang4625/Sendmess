const express = require('express');
const http = require('http');
const socketio = require('socket.io');
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

io.on('connection', (socket) => {
  console.log('We had a new connection');
  socket.on('disconnect', () => {
    console.log('User had left');
  })
})

app.use(router);
server.listen(PORT, () => console.log('Server started'));
