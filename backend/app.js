const express = require('express');
const routes = require('./routes');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

// Log requests
app.use(morgan('dev'));

// Parse cookies and JSON
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // Enable CORS only in development
  app.use(cors());
}

// Helmet for setting security-related HTTP headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
);

// Connect all the routes **AFTER** applying csurf
app.use(routes);

// Export the app
module.exports = app;