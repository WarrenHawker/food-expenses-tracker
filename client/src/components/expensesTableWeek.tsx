import { useState, useEffect } from 'react';
import { Expense, CurrentWeek } from '../misc/interfaces';
import IndividualExpense from './individualExpense';
import { useExpenses } from '../context/expensesContext';
import DateSelector from './dateSelector';
import {
  getWeekBeginning,
  resetTimeZero,
  resetTimeEnd,
  getSelectedExpenses,
  getMoneySpent,
} from '../misc/functions';

function ExpensesTableWeek() {
  const { expenses } = useExpenses();
  const [budget, setBudget] = useState<number>(50);
  const [moneySpent, setMoneySpent] = useState<number>(0);
  const [currentWeekExpenses, setCurrentWeekExpenses] = useState<Expense[]>();
  const [currentWeek, setCurrentWeek] = useState<CurrentWeek>();

  useEffect(() => {
    const weekBegin = getWeekBeginning();
    let weekEnd = new Date();
    weekEnd.setDate(weekBegin.getDate() + 6);
    setCurrentWeek({
      weekBeginning: resetTimeZero(weekBegin),
      weekEnding: resetTimeEnd(weekEnd),
    });
    const WeeklyExpenses = getSelectedExpenses(expenses, weekBegin, weekEnd);
    setCurrentWeekExpenses(WeeklyExpenses);

    const newMoneySpent = getMoneySpent(WeeklyExpenses);
    setMoneySpent(newMoneySpent);
  }, [expenses]);

  const changeWeek = (option: string): void => {
    let weekBegin = new Date(currentWeek!.weekBeginning);
    let weekEnd = new Date(currentWeek!.weekEnding);

    if (option == 'next') {
      weekBegin.setDate(weekBegin.getDate() + 7);
      weekEnd.setDate(weekEnd.getDate() + 7);
    } else if (option == 'prev') {
      weekBegin.setDate(weekBegin.getDate() - 7);
      weekEnd.setDate(weekEnd.getDate() - 7);
    }
    setCurrentWeek({ weekBeginning: weekBegin, weekEnding: weekEnd });

    const newWeeklyExpenses = getSelectedExpenses(expenses, weekBegin, weekEnd);
    setCurrentWeekExpenses(newWeeklyExpenses);

    const newMoneySpent = getMoneySpent(newWeeklyExpenses);
    setMoneySpent(newMoneySpent);
  };

  return (
    <>
      <section className='date-selector'>
        {currentWeek ? (
          <DateSelector currentWeek={currentWeek} changeDates={changeWeek} />
        ) : null}
      </section>
      <h2 className='table-title'>Weekly Expenses Table</h2>
      <section className='budget-display'>
        <h3>
          Weekly Budget: <span>£{budget.toFixed(2)}</span>
        </h3>
        <h3>
          Amount Spent: <span>£{moneySpent.toFixed(2)}</span>
        </h3>
        <h3>
          Budget Remaining: <span>£{(budget - moneySpent).toFixed(2)}</span>
        </h3>
      </section>
      {currentWeekExpenses && currentWeekExpenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Bought from</th>
              <th className='amount-heading'>Amount Paid</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='empty-row'></tr>
            {currentWeekExpenses.map((item: Expense) => (
              <IndividualExpense
                key={item._id}
                _id={item._id}
                company={item.company}
                amount={item.amount}
                date={new Date(item.date)}
                notes={item.notes}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className='no-expenses-message'>
          There are no expenses recorded for this time period
        </h3>
      )}
    </>
  );
}

export default ExpensesTableWeek;
