const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    trim: true
  },
  roomCapacity: {
    type: Number,
    required: true,
  },
  roomSupervisor: {
    type: String,
    trim: true
  },
});

const CentreRoom = mongoose.model('CentreRoom', userSchema);

module.exports = CentreRoom;
