//imports
const express = require('express');
const {
  getAllExpenses,
  createExpense,
  deleteExpense,
  editExpense,
} = require('../controllers/expensesController');

//initialise express router
const router = express.Router();

//get all expenses
router.get('/', getAllExpenses);

//post new expense
router.post('/', createExpense);

//delete expense
router.delete('/:id', deleteExpense);

//edit expense
router.patch('/:id', editExpense);

module.exports = router;
