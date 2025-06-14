const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Placeholder route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Error handling middleware placeholder
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
