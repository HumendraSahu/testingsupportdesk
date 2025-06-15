const express = require('express');
const cors = require('cors');

const pingRoutes = require('./routes/pingRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const kbRoutes = require('./routes/kbRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v2', pingRoutes);
app.use('/api/v2/register', userRoutes);
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2', companyRoutes);
app.use('/api/v2/kb', kbRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
