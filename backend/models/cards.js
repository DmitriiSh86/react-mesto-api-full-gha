const mongoose = require('mongoose');
const validator = require('validator');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  likes: {
    type: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardsSchema);
