const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const sendMail = require('../utils/Email');

const enquirySchema = new Schema({
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
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
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
  dogDateOfBirth: {
    type: Date,
    required: true,
  },
  requestedDays:{
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  enrollmentCode: {
    type: String
  },
  centre: [{
    type: Schema.Types.ObjectId,
    ref: 'Centre',
  }],
  centreRoom: [{
    type: Schema.Types.ObjectId,
    ref: 'CentreRoom',
  }]
});

enquirySchema.pre('save', async function(next) {
  if (this.isNew)
  {
    const userData = {
      fullname: this.firstName + ' ' + this.lastName,
      email: this.email,
      };
    sendMail("Enquiry",userData);
  }

  next();
});
const Enquiry = model('Enquiry', enquirySchema);

module.exports = Enquiry;
