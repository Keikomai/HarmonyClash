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

const chatRooms: Record<string, ChatHistory[]> = {};

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

const users: Record<string, string> = {};

let counter: number = 0;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('room/join', (roomId, userName) => {
    console.log(`${userName} joined room ${roomId}`);

    if (!chatRooms[roomId]) {
      console.log(chatRooms, 'chatRooms');
      console.log(roomId, 'chatRooms roomId');
      chatRooms[roomId] = [];
    }

    users[socket.id] = userName;
    console.log(users[socket.id], 'users[socket.id]');
    socket.join(roomId);

    socket.emit(
      'user/joinChatSuccess',
      `${userName} - you connected to room ${roomId}`,
    );

    socket.emit('user/connected', chatRooms[roomId]);

    counter += 1;
    io.emit('user/count', counter);

    io.to(roomId).emit(
      'chat/userJoined',
      `${userName} connected to room ${roomId}`,
    );
    console.log(chatRooms[roomId], 'chatRooms');
    socket.emit('user/allMessages', chatRooms[roomId]);
  });

  socket.on('room/create', (roomId) => {
    console.log(roomId, 'Room has been created');

    socket.emit('room/created', roomId);
  });

  socket.on('chat/newMessage', (roomId, message) => {
    console.log(`New message in room ${roomId}: ${message}`);
    console.log(users, 'usr');
    const entry = {
      author: users[socket.id],
      message,
      timestamp: Date.now(),
    };

    if (!chatRooms[roomId]) {
      chatRooms[roomId] = [];
    }

    chatRooms[roomId].push(entry);
    io.to(roomId).emit('chat/newMessage', entry);
    socket.emit('user/allMessages', chatRooms[roomId]);
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
