const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const apiError = require('../utils/errorHandler');
router.use(express.json());

router
  .post('/register', authController.register)
  .post('/refreshToken', authController.refreshToken)
  .post('/login', authController.login)
  .delete('/logout', authController.logout);

// Error handling middleware
router.use(apiError.apiErr);

module.exports = router;
