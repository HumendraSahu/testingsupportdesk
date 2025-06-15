const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/helpdesk';
    const conn = await mongoose.connect(mongoURI);

    Grid.mongo = mongoose.mongo;
    gfs = Grid(conn.connection.db, mongoose.mongo);

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

const getGridFS = () => gfs;

module.exports = { connectDB, getGridFS };
