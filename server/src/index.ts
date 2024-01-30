import { createServer } from 'node:http';

import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

type ChatHistory = {
  author: string;
  message: string;
  timestamp: number;
};

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

dotenv.config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.use(express.static('public'));
app.use(express.json());

const chatHistory: ChatHistory[] = [];
const users: Record<string, string> = {};

let counter: number = 0;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('user/join', (userName) => {
    console.log(`Hello ${userName}`);

    users[socket.id] = userName;

    socket.emit('user/joinChatSuccess', `${userName} - you connected to chat`);

    socket.emit('user/connected', chatHistory);

    counter += 1;
    io.emit('user/count', counter);

    socket.broadcast.emit('chat/userJoined', `${userName} connected to chat`);
  });

  socket.on('chat/newMessage', (message) => {
    console.log(`New message: ${message}`);

    const entry = {
      author: users[socket.id],
      message,
      timestamp: Date.now(),
    };

    chatHistory.push(entry);
    io.emit('chat/newMessage', entry);
    socket.emit('user/allMessages', chatHistory);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');

    counter -= 1;
    io.emit('user/count', counter);
  });
});

function startApp() {
  try {
    server.listen(PORT, () => console.log('Server started', PORT, 'port'));
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startApp();
