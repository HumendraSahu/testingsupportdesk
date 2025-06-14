const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./db/connection');
const { MONGO_URI } = require('./utils/constants');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function init() {
  await connectDB(MONGO_URI);
}

init().catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});

// TODO: Mount routes here

module.exports = app;
