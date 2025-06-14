const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const { connectDB } = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/supportdesk');

// TODO: mount routes

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
