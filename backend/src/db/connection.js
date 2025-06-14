const mongoose = require('mongoose');

async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }
  await mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = connect;
