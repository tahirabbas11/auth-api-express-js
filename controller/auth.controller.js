const createError = require('http-errors');
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { name, email, pass } = req.body;
    const { accesToken, refreshToken } = await authService.register(name, email, pass);
    res.status(201).json({ accesToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { accesToken, new_refreshToken } = await authService.refreshToken(refreshToken);
    res.send({ accesToken, refreshToken: new_refreshToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    const { accesToken, refreshToken } = await authService.login(email, pass);
    res.send({ accesToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(204).json({
      status: 204,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  refreshToken,
  login,
  logout,
};