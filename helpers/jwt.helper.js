const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { Verify } = require('crypto');
const { reject } = require('bcrypt/promises');
require('dotenv').config();
const client = require('./init.redis');

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '1y',
        issuer: 'https://github.com/tahirabbas11',
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError);
        }
        resolve(token);
      });
    });
  },

  VerifyAccessToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // If Authorization header is missing or does not start with 'Bearer '
      return next(createError.Unauthorized());
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      // If no token found after 'Bearer ' (e.g., 'Bearer ')
      return next(createError.Unauthorized());
    }

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const errorMessage = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(createError.Unauthorized(errorMessage));
      }

      // Token is valid, attach the payload to the request object
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1y',
        issuer: 'https://www.yourwebsite.com',
        audience: userId,
      };

      // Sign the JWT token
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        // Store the token in Redis with expiration 365 * 24 * 60 * 60
        client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
            return;
          }
          console.log('Token added to Redis');
          resolve(token);
        });
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err) {
          // Handle different types of errors
          if (err.name === 'JsonWebTokenError') {
            reject(createError.Unauthorized('Invalid refresh token'));
          } else {
            reject(createError.InternalServerError('Token verification failed'));
          }
        } else {
          // Extract userId from the payload and resolve the promise
          const userId = payload.aud;
          client.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              reject(createError.InternalServerError);
              return;
            }
            if (refreshToken === result) return resolve(userId);
            reject(createError.Unauthorized());
          });
        }
      });
    });
  },
};
