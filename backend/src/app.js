const express = require('express');
const cors = require('cors');

const pingRoutes = require('./routes/pingRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', pingRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
