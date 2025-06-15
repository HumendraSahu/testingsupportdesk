require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const connectDb = require('./src/db/connection');
const { connectRedis } = require('./src/db/redis');
const { initSocket } = require('./src/sockets');

const port = process.env.PORT || 3000;

async function start() {
  try {
    await connectDb();
    await connectRedis();
    const server = http.createServer(app);
    initSocket(server);
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
