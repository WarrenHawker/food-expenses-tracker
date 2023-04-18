//imports
const express = require('express');
const {
  getAllExpenses,
  createExpense,
  deleteExpense,
} = require('../controllers/expensesController');

//initialise express router
const router = express.Router();

//get all expenses
router.get('/', getAllExpenses);

//post new expense
router.post('/', createExpense);

//delete expense
router.delete('/:id', deleteExpense);

module.exports = router;
