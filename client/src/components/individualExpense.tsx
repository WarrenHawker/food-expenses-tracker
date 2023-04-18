import { dateToString } from '../misc/functions';
import { Expense } from '../misc/interfaces';
import { useExpenses } from '../context/expensesContext';

function IndividualExpense({ _id, company, amount, date, notes }: Expense) {
  const { deleteExpense } = useExpenses();

  const deleteHandler = async () => {
    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'DELETE',
      body: JSON.stringify(_id),
    });
    if (response.ok) {
      deleteExpense(_id);
    }
  };

  return (
    <tr>
      <td>{company}</td>
      <td>£{amount}</td>
      <td>{dateToString(date)}</td>
      <td>{notes}</td>
      <td>
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </tr>
  );
}

export default IndividualExpense;
