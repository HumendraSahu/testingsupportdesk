const express = require('express');
const cors = require('cors');

const pingRoutes = require('./routes/pingRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v2', pingRoutes);
app.use('/api/v2/register', userRoutes);
app.use('/api/v2', companyRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
