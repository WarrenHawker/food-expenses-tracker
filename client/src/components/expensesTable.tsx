import { useState, useEffect } from 'react';
import { Expense, CurrentWeek } from '../misc/interfaces';
import IndividualExpense from './individualExpense';
import { useExpenses } from '../context/expensesContext';
import DateSelector from './dateSelector';
import {
  getWeekBeginning,
  resetTimeZero,
  resetTimeEnd,
  getWeeklyExpenses,
  getWeeklyMoneySpent,
} from '../misc/functions';

function ExpensesTable() {
  const { expenses } = useExpenses();
  const [currentWeek, setCurrentWeek] = useState<CurrentWeek>();
  const [currentMonth, setCurrentMonth] = useState<number>();
  const [budget, setBudget] = useState<number>(50);
  const [moneySpent, setMoneySpent] = useState<number>(0);
  const [currentWeekExpenses, setCurrentWeekExpenses] = useState<Expense[]>();

  useEffect(() => {
    const newDate = new Date();
    const weekBegin = getWeekBeginning();
    let weekEnd = new Date();
    weekEnd.setDate(weekBegin.getDate() + 6);
    setCurrentMonth(newDate.getMonth());
    setCurrentWeek({
      weekBeginning: resetTimeZero(weekBegin),
      weekEnding: resetTimeEnd(weekEnd),
    });
    const newWeeklyExpenses = getWeeklyExpenses(expenses, weekBegin, weekEnd);
    setCurrentWeekExpenses(newWeeklyExpenses);

    const newMoneySpent = getWeeklyMoneySpent(newWeeklyExpenses);
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
    setCurrentMonth(weekBegin.getMonth());

    const newWeeklyExpenses = getWeeklyExpenses(expenses, weekBegin, weekEnd);
    setCurrentWeekExpenses(newWeeklyExpenses);

    const newMoneySpent = getWeeklyMoneySpent(newWeeklyExpenses);
    setMoneySpent(newMoneySpent);
  };

  return (
    <>
      <section className='date-selector'>
        {currentMonth && currentWeek ? (
          <DateSelector
            currentWeek={currentWeek}
            currentMonth={currentMonth}
            changeWeek={changeWeek}
          />
        ) : null}
      </section>
      <h2>expenses table</h2>
      <p>Weekly Budget: £{budget.toFixed(2)}</p>
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
          {currentWeekExpenses
            ? currentWeekExpenses.map((item: Expense) => (
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

export default ExpensesTable;
