const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

const connectDB = async (mongoURI) => {
  try {
    const conn = await mongoose.connect(mongoURI);
    const db = mongoose.connection.db;
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('uploads');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const getGFS = () => gfs;

module.exports = { connectDB, getGFS };
