//imports
const Expense = require('../models/expensesModel');
const mongoose = require('mongoose');

//get all expenses
const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find({}).sort({ date: -1 });

  res.status(200).json(expenses);
};

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

//delete expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.deleteOne({ _id: id });
    res.status(200).json({ message: 'expense deleted successsfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//edit expense
const editExpense = async (req, res) => {
  const { id } = req.params;
  const { company, amount, date, notes } = req.body;
  let update = {};
  if (company) {
    update.company = company;
  }
  if (amount) {
    update.amount = amount;
  }
  if (date) {
    update.date = date;
  }
  if (notes) {
    update.notes = notes;
  }

  if (!update) {
    return res.status(400).json({ message: 'no changes to be made' });
  }

  try {
    const expense = await Expense.findOneAndUpdate({ _id: id }, update);
    console.log(expense);
    return res.status(200).json(expense);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllExpenses, createExpense, deleteExpense, editExpense };
