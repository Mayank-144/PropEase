import { Server } from 'socket.io';
import { logger } from '../utils/logger.js';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Emit a welcome message to the newly connected client
    socket.emit('receive_message', {
      senderId: 'SYSTEM',
      message: 'Welcome to PropEase Real-time! Connection established.',
      timestamp: new Date().toISOString()
    });

    // Join a private room for specific user if authenticated
    socket.on('join', (userId) => {
      socket.join(userId);
      logger.info(`User ${userId} joined their private room`);
    });

    // Handle chat messages
    socket.on('send_chat_message', (data) => {
      const { recipientId, message, senderName } = data;
      const chatPayload = {
        senderId: socket.id,
        senderName: senderName || 'User',
        message,
        timestamp: new Date().toISOString()
      };

      if (recipientId) {
        io.to(recipientId).emit('receive_chat_message', chatPayload);
      } else {
        // Broadcast to everyone (Global Chat)
        io.emit('receive_chat_message', chatPayload);
      }
    });

    // Handle generic message/notification
    socket.on('send_message', (data) => {
      const { recipientId, message } = data;
      if (recipientId) {
        io.to(recipientId).emit('receive_message', {
          senderId: socket.id,
          message,
          timestamp: new Date().toISOString()
        });
      } else {
        // Broadcast to all if no recipient
        socket.broadcast.emit('receive_message', {
          senderId: socket.id,
          message,
          timestamp: new Date().toISOString()
        });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
