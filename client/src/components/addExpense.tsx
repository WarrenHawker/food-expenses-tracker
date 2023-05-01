import React, { useState } from 'react';
import { dateToString } from '../misc/functions';
import { useExpenses } from '../context/expensesContext';
import { useAuth } from '../context/authContext';

function AddExpense() {
  const [companyInput, setCompanyInput] = useState<string>('');
  const [amountInput, setAmountInput] = useState<string>('');
  const [dateInput, setDateInput] = useState<Date | undefined>();
  const [notesInput, setNotesInput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const { addExpense } = useExpenses();
  const { user, serverBaseURL } = useAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const expense = {
      company: companyInput,
      date: dateInput,
      amount: amountInput,
      notes: notesInput,
    };

    if (!user) {
      return;
    }
    const response = await fetch(`${serverBaseURL}/api/expenses`, {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        'Content-Type': 'application/json',
        //prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setAmountInput('');
      setCompanyInput('');
      setDateInput(undefined);
      setNotesInput('');
      setError('');
      setEmptyFields([]);
      addExpense(json);
    }
  };

  const clearForm = () => {
    setAmountInput('');
    setCompanyInput('');
    setDateInput(undefined);
    setNotesInput('');
    setError('');
    setEmptyFields([]);
  };

  const useTodayDate = (e: React.FormEvent) => {
    e.preventDefault();
    setDateInput(new Date());
  };
  return (
    <section className='form-container' id='new-expense-form'>
      <h1>Add New Expense</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='input-container'>
          <label htmlFor='company'>Bought from (shop or company)</label>
          <input
            className={emptyFields.includes('company') ? 'invalid' : ''}
            type='text'
            name='company'
            value={companyInput}
            onChange={(e) => setCompanyInput(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='amount'>Amount paid (£)</label>
          <input
            className={emptyFields.includes('amount') ? 'invalid' : ''}
            type='number'
            name='amount'
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='date'>Date</label>
          <button className='btn btn-secondary' onClick={useTodayDate}>
            Use Today's Date
          </button>
          <input
            className={emptyFields.includes('date') ? 'invalid' : ''}
            type='date'
            name='date'
            value={dateToString(dateInput, true)}
            onChange={(e) => setDateInput(new Date(e.target.value))}
          />
        </div>

        <div className='input-container'>
          <label htmlFor='notes'>Notes</label>
          <textarea
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
          />
        </div>
        <div className='button-container'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={clearForm}>
            Reset
          </button>
          <button type='submit' className='btn btn-primary'>
            Add expense
          </button>
        </div>
      </form>
      {error ? <p className='error'>{error}</p> : null}
    </section>
  );
}

export default AddExpense;
