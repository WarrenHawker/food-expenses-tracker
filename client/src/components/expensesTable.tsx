import { useState, useEffect } from 'react';
import { Expense, CurrentWeek } from '../misc/interfaces';
import IndividualExpense from './individualExpense';
import { useExpenses } from '../context/expensesContext';
import DateSelector from './dateSelector';
import { getWeekBeginning } from '../misc/functions';

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
    setCurrentWeek({ weekBeginning: weekBegin, weekEnding: weekEnd });

    const newWeeklyExpenses = expenses.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getDate() >= weekBegin.getDate() &&
        date.getDate() <= weekEnd.getDate()
      );
    });

    setCurrentWeekExpenses(newWeeklyExpenses);
    const newMoneySpent = newWeeklyExpenses
      .map((item) => {
        return parseFloat(item.amount);
      })
      .reduce((next, number) => {
        return next + number;
      }, 0);
    setMoneySpent(newMoneySpent);
  }, [expenses]);

  let expensesDisplay;
  if (currentWeekExpenses) {
    expensesDisplay = currentWeekExpenses.map((item: Expense) => {
      return (
        <IndividualExpense
          key={item._id}
          _id={item._id}
          company={item.company}
          amount={item.amount}
          date={new Date(item.date)}
          notes={item.notes}
        />
      );
    });
  }

  const prevWeek = () => {
    let weekBegin = new Date(currentWeek!.weekBeginning);
    let weekEnd = new Date(currentWeek!.weekEnding);

    weekBegin.setDate(weekBegin.getDate() - 7);
    weekEnd.setDate(weekEnd.getDate() - 7);

    setCurrentWeek({ weekBeginning: weekBegin, weekEnding: weekEnd });
    setCurrentMonth(weekBegin.getMonth());

    const newWeeklyExpenses = expenses.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getDate() >= weekBegin.getDate() &&
        date.getDate() <= weekEnd.getDate()
      );
    });

    setCurrentWeekExpenses(newWeeklyExpenses);
    const newMoneySpent = newWeeklyExpenses
      .map((item) => {
        return parseFloat(item.amount);
      })
      .reduce((next, number) => {
        return next + number;
      }, 0);
    setMoneySpent(newMoneySpent);
  };

  const nextWeek = () => {
    let weekBegin = new Date(currentWeek!.weekBeginning);
    let weekEnd = new Date(currentWeek!.weekEnding);

    weekBegin.setDate(weekBegin.getDate() + 7);
    weekEnd.setDate(weekEnd.getDate() + 7);

    setCurrentWeek({ weekBeginning: weekBegin, weekEnding: weekEnd });
    setCurrentMonth(weekBegin.getMonth());

    const newWeeklyExpenses = expenses.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getDate() >= weekBegin.getDate() &&
        date.getDate() <= weekEnd.getDate()
      );
    });

    setCurrentWeekExpenses(newWeeklyExpenses);
    const newMoneySpent = newWeeklyExpenses
      .map((item) => {
        return parseFloat(item.amount);
      })
      .reduce((next, number) => {
        return next + number;
      }, 0);
    setMoneySpent(newMoneySpent);
  };

  return (
    <>
      <section className='date-selector'>
        {currentMonth && currentWeek ? (
          <DateSelector
            currentWeek={currentWeek}
            currentMonth={currentMonth}
            prevWeek={prevWeek}
            nextWeek={nextWeek}
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
        <tbody>{expensesDisplay}</tbody>
      </table>
    </>
  );
}

export default ExpensesTable;
function acc(
  previousValue: Expense,
  currentValue: Expense,
  currentIndex: number,
  array: Expense[]
): Expense {
  throw new Error('Function not implemented.');
}
