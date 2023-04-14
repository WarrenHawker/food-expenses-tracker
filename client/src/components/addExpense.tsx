import React, { useState } from 'react';

function AddExpense() {
  const [companyInput, setCompanyInput] = useState<string>('');
  const [amountInput, setAmountInput] = useState<number>();
  const [dateInput, setDateInput] = useState<Date>();
  const [notesInput, setNotesInput] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
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
          onChange={(e) => setAmountInput(parseInt(e.target.value))}
        />
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          name='date'
          value={dateInput?.toDateString()}
          onChange={(e) => setDateInput(new Date(e.target.value))}
        />
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
