const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
require('./helpers/init.mongoDB');
const AuthRoute = require('./routes/auth.route');
const { VerifyAccessToken } = require('./helpers/jwt.helper');
const appError = require('./utils/errorHandler');

// Create Express application
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', VerifyAccessToken, async (req, res, next) => {
  res.send('Hello from Express');
});

app.use('/auth', AuthRoute); // Authentication routes

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

// Error Handling Middleware: Centralized error handling
app.use(appError.expressError);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
