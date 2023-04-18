import {} from 'react';
import { Expense } from '../misc/interfaces';
import IndividualExpense from './individualExpense';
import { useExpenses } from '../context/expensesContext';

function ExpensesTable() {
  const { expenses } = useExpenses();
  const expensesDisplay = expenses.map((item: Expense) => {
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

  return (
    <>
      <h2>expenses table</h2>
      <table>
        <thead>
          <th>Bought from</th>
          <th>Amount Paid</th>
          <th>Date</th>
          <th>Notes</th>
        </thead>
        <tbody>{expensesDisplay}</tbody>
      </table>
    </>
  );
}

export default ExpensesTable;
