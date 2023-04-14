//imports
const Expense = require('../models/expensesModel');
const mongoose = require('mongoose');

//get all expenses
const getAllExpenses = () => {};

//post new expense
const createExpense = async (req, res) => {
  const { company, date, amount, notes } = req.body;

  //   check if any fields are empty - send error to client
  let emptyFields = [];
  if (!company) {
    emptyFields.push('company');
  }
  if (!date) {
    emptyFields.push('date');
  }
  if (!amount) {
    emptyFields.push('amount');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all required fields', emptyFields });
  }

  try {
    const expense = await Expense.create({
      company,
      date,
      amount,
      notes,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllExpenses, createExpense };
