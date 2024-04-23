const User = require('../model/user.model');
const createError = require('http-errors');
const authSchema = require('../helpers/validation.schema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt.helper');
const client = require('../helpers/init.redis');

const register = async (name, email, pass) => {
  const result = await authSchema.RegisterValidationSchema.validateAsync({ name, email, pass });
  const doesExist = await User.findOne({ email });
  if (doesExist) {
    throw createError.Conflict(`${email} already exists, please use another email`);
  }
  const user = new User({ name, email, pass });
  const savedUser = await user.save();
  const accesToken = await signAccessToken(savedUser.id);
  const refreshToken = await signRefreshToken(savedUser.id);
  return { accesToken, refreshToken };
};

const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(400, 'Missing refreshToken');
  }
  const userId = await verifyRefreshToken(refreshToken);
  if (!userId) {
    throw createError(401, 'Invalid refreshToken');
  }
  const accesToken = await signAccessToken(userId);
  const new_refreshToken = await signRefreshToken(userId);
  return { accesToken, new_refreshToken };
};

const login = async (email, pass) => {
  const result = await authSchema.loginValidationSchema.validateAsync({ email, pass });
  const user = await User.findOne({ email: result.email });
  if (!user) {
    throw createError.NotFound('User not registered');
  }
  const isMatched = await user.isValidPass(result.pass);
  if (!isMatched) {
    throw createError.Unauthorized('Email or password is not valid');
  }
  const accesToken = await signAccessToken(user.id);
  const refreshToken = await signRefreshToken(user.id);
  return { accesToken, refreshToken };
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw createError.BadRequest('Missing refreshToken');
  }
  const userId = await verifyRefreshToken(refreshToken);
  await client.DEL(userId);
};

module.exports = {
  register,
  refreshToken,
  login,
  logout,
};
