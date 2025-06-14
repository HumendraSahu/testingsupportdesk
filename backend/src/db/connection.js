const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const config = require('../utils/constants');

const connection = {};

async function connectDB(uri) {
  if (connection.isConnected) return connection.client;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();

  const db = client.db();
  const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

  connection.client = client;
  connection.bucket = bucket;
  connection.isConnected = true;

  return client;
}

module.exports = { connectDB, connection };
