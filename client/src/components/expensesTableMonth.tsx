import { useState, useEffect } from 'react';
import { Expense } from '../misc/interfaces';
import IndividualExpense from './individualExpense';
import { useExpenses } from '../context/expensesContext';
import DateSelector from './dateSelector';
import { getSelectedExpenses, getMoneySpent } from '../misc/functions';

function ExpensesTableMonth() {
  const { expenses } = useExpenses();
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(2023);
  const [budget, setBudget] = useState<number>(200);
  const [moneySpent, setMoneySpent] = useState<number>(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState<Expense[]>();
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const y = today.getFullYear();
    const m = today.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

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
    const lastDay = new Date(newYear, newMonth + 1, 0);
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
      <h2>Monthly Expenses Table</h2>
      <p>Monthly Budget: £{budget.toFixed(2)}</p>
      <p>Amount Spent: £{moneySpent.toFixed(2)}</p>
      <p>Budget Remaining: £{(budget - moneySpent).toFixed(2)}</p>
      <table>
        <thead>
          <tr>
            <th>Bought from</th>
            <th>Amount Paid</th>
            <th>Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {currentMonthExpenses
            ? currentMonthExpenses.map((item: Expense) => (
                <IndividualExpense
                  key={item._id}
                  _id={item._id}
                  company={item.company}
                  amount={item.amount}
                  date={new Date(item.date)}
                  notes={item.notes}
                />
              ))
            : null}
        </tbody>
      </table>
    </>
  );
}

export default ExpensesTableMonth;
