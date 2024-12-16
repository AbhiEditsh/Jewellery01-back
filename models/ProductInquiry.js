const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Invalid email format"],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Mobile number must be 10 digits"],
  },
  category: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ProductInquiry", inquirySchema);
