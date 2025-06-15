// Basic Socket.IO server setup
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisOptions = { url: redisUrl };

  if (process.env.REDIS_USERNAME) {
    redisOptions.username = process.env.REDIS_USERNAME;
  }

  if (process.env.REDIS_PASSWORD) {
    redisOptions.password = process.env.REDIS_PASSWORD;
  }

  const pubClient = createClient(redisOptions);
  const subClient = pubClient.duplicate();

  Promise.all([pubClient.connect(), subClient.connect()])
    .then(() => {
      io.adapter(createAdapter(pubClient, subClient));
      console.log('Socket.IO Redis adapter connected');
    })
    .catch((err) => {
      console.error('Failed to connect Redis adapter:', err);
    });

  return io;
}

module.exports = {
  initSocket,
};
