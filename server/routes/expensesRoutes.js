//imports
const express = require('express');
const {
  getAllExpenses,
  createExpense,
} = require('../controllers/expensesController');

//initialise express router
const router = express.Router();

//get all expenses
router.get('/', getAllExpenses);

//post new expense
router.post('/', createExpense);
