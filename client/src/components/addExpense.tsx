import React, { useState } from 'react';
import { convertDate } from '../misc/functions';

function AddExpense() {
  const [companyInput, setCompanyInput] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<Date>();
  const [notesInput, setNotesInput] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const expense = {
      company: companyInput,
      date: dateInput,
      amount: parseInt(amountInput),
      notes: notesInput,
    };
    console.log(expense);

    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log(json);
  };

  const useTodayDate = (e: React.FormEvent) => {
    e.preventDefault();
    setDateInput(new Date());
  };
  return (
    <section className='form-container'>
      <h2>Add new Expense</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor='company'>Bought from (shop or company)</label>
        <input
          type='text'
          name='company'
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
        />
        <label htmlFor='amount'>Amount paid (£)</label>
        <input
          type='number'
          name='amount'
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
        />
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          name='date'
          value={convertDate(dateInput)}
          onChange={(e) => setDateInput(new Date(e.target.value))}
        />
        <button onClick={useTodayDate}>Use Today's Date</button>
        <label htmlFor='notes'>Notes</label>
        <textarea
          value={notesInput}
          onChange={(e) => setNotesInput(e.target.value)}
        />
        <button>Add expense</button>
      </form>
    </section>
  );
}

export default AddExpense;
