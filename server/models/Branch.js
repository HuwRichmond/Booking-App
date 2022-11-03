const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  branchName: {
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
  email1: {
    type: String,
    required: true,
  },
  email2: {
    type: String,
  },
  phone1: {
    type: String,
    required: true,
  },
  phone2: {
    type: String,
  },
  branchRoom: [{
    type: Schema.Types.ObjectId,
    ref: 'BranchRoom',
  }]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
//   if (this.isNew)
//   {
//     this.status=true;
//   }


  next();
});


const Branch = mongoose.model('Branch', userSchema);

module.exports = Branch;
