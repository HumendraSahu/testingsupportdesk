const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gridfsBucket;

async function connect() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }

  await mongoose.connect(uri);
  Grid.mongo = mongoose.mongo;
  gridfsBucket = Grid(mongoose.connection.db, mongoose.mongo);
  return mongoose.connection;
}

module.exports = {
  connect,
  connection: mongoose.connection,
  gridfsBucket,
};
