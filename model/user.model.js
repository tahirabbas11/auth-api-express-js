const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  meta: {
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdDt: {
      type: Date,
      default: Date.now,
    },
  },
});

//mongoose middleware
userSchema.pre('save', async function (next) {
  try {
    //console.log("Called before saving user");
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashedPassword = await bcrypt.hash(this.pass, salt);
    this.pass = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPass = async function (pass) {
  try {
    return await bcrypt.compare(pass, this.pass);
  } catch (error) {
    throw error;
  }
};

// Creating the User model
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
