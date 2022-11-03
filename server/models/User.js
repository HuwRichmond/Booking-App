const mongoose = require('mongoose');
const userRoles = require('../utils/userRoles');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  userType:{
    type: String,
    enum: userRoles
  },
  status: {
    type: Boolean
  },
  resetCode:{
    type: String
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew)
  {
    this.status=true;
  }
  console.log("IsModified", this.isModified('password'));
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.pre('findOneAndUpdate', async function(next) {

  if (this._update.password){
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
