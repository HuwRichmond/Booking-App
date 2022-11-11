const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  dogFirstName: {
    type: String,
    required: true,
    trim: true
  },
  dogLastName: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  suburb: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postCode: {
    type: Number,
    required: true
  },
  
  firstNameOwner1: {
    type: String,
    required: true,
    trim: true
  },
  lastNameOwner1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1Owner1: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2Owner1: {
    type: String,
    trim: true
  },
  suburbOwner1: {
    type: String,
    required: true,
    trim: true
  },
  stateOwner1: {
    type: String,
    required: true,
    trim: true
  },
  postCodeOwner1: {
    type: Number,
    required: true
  },
  emailOwner1: {
    type: String,
    required: true,
  },
  phoneOwner1: {
    type: String,
    required: true,
  },

  firstNameOwner2: {
    type: String,
    required: true,
    trim: true
  },
  lastNameOwner2: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1Owner2: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2Owner2: {
    type: String,
    trim: true
  },
  suburbOwner2: {
    type: String,
    required: true,
    trim: true
  },
  stateOwner2: {
    type: String,
    required: true,
    trim: true
  },
  postCodeOwner2: {
    type: Number,
    required: true
  },
  emailOwner2: {
    type: String,
  },
  phoneOwner2: {
    type: String,
    required: true,
  },

  firstNameEmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  lastNameEmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  addressLine1EmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  addressLine2EmergencyContact: {
    type: String,
    trim: true
  },
  suburbEmergencyContact: {
    type: String,
    required: true,
    trim: true
  },
  stateEmergencyContact: {
    type: String,
  },
  postCodeEmergencyContact: {
    type: Number,
  },
  emailEmergencyContact: {
    type: String,
  },
  phoneEmergencyContact: {
    type: String,
    required: true,
  },
  
  joiningDate: {
    type: Date,
  },
  daysAllocated: {
    type: Array,
  },
  CentreRoom: [{
    type: Schema.Types.ObjectId,
    ref: 'CentreRoom',
  }]
});


const Dog = mongoose.model('Dog', userSchema);

module.exports = Dog;
