import { useState, useEffect } from 'react';
import { Expense } from '../../misc/interfaces';
import IndividualExpense from './individualExpense';
import { useExpenses } from '../../context/expensesContext';
import DateSelector from '../dateSelector';
import {
  getSelectedExpenses,
  getMoneySpent,
  calcRemainingBudget,
  getLastDayOfMonth,
  resetTimeEnd,
} from '../../misc/functions';

function ExpensesTableMonth() {
  const { expenses } = useExpenses();
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [budget, setBudget] = useState<number>(250);
  const [moneySpent, setMoneySpent] = useState<number>(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<Expense[]>();
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const y = today.getFullYear();
    const m = today.getMonth();
    const firstDay = new Date(y, m, 1);

    let lastDay = new Date(y, m, getLastDayOfMonth(m));
    lastDay = resetTimeEnd(lastDay);

    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());

    const selectedExpenses = getSelectedExpenses(expenses, firstDay, lastDay);
    setCurrentMonthExpenses(selectedExpenses);
    setMoneySpent(getMoneySpent(selectedExpenses));
  }, [expenses]);

  const changeMonth = (option: string): void => {
    let newMonth = currentMonth;
    let newYear = currentYear;
    if (option == 'prev') {
      if (currentMonth == 0) {
        newMonth = 11;
        newYear -= 1;
      } else newMonth -= 1;
    } else if (option == 'next') {
      if (currentMonth == 11) {
        newMonth = 0;
        newYear += 1;
      } else newMonth += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    const firstDay = new Date(newYear, newMonth, 1);
    let lastDay = new Date(newYear, newMonth, getLastDayOfMonth(newMonth));
    lastDay = resetTimeEnd(lastDay);
    const selectedExpenses = getSelectedExpenses(expenses, firstDay, lastDay);
    setCurrentMonthExpenses(selectedExpenses);
    setMoneySpent(getMoneySpent(selectedExpenses));
  };

  return (
    <>
      <section className='date-selector'>
        <DateSelector
          currentMonth={currentMonth}
          currentYear={currentYear}
          changeDates={changeMonth}
        />
      </section>
      <h2 className='table-title'>Monthly Expenses Table</h2>
      <section className='budget-display'>
        <h3>
          Monthly Budget: <span>£{budget.toFixed(2)}</span>
        </h3>
        <h3>
          Amount Spent: <span>£{moneySpent.toFixed(2)}</span>
        </h3>
        <h3 className={moneySpent > budget ? 'error' : ''}>
          {moneySpent > budget ? 'Budget Overspent: ' : 'Budget Remaining: '}
          <span>£{calcRemainingBudget(budget, moneySpent).toFixed(2)}</span>
        </h3>
      </section>

      {currentMonthExpenses && currentMonthExpenses.length > 0 ? (
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
            {currentMonthExpenses.map((item: Expense) => (
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

export default ExpensesTableMonth;
