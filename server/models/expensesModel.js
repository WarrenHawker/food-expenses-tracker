//import mongoose
const mongoose = require('mongoose');

//create new mongoose schema
const Schema = mongoose.Schema;

//define fields
const expensesSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model('Expenses', expensesSchema);
