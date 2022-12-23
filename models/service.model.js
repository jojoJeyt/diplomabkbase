const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String },
  role: { type: String },
  tasks: {
    type: [
      {
        task: { type: String },
        comment: { type: String },
        manager: { type: String },
        status: { type: String },
        date: { type: Date },
        managerId: { type: String },
        finishDate: { type: Date },
      }
    ],
    default: [],
  }

});

const services = mongoose.model('services', ServicesSchema)

module.exports = services;
