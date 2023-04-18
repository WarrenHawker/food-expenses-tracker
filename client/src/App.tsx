import AddExpense from './components/addExpense';
import ExpensesTable from './components/expensesTable';

function App() {
  return (
    <>
      <header>
        <h1>Expenses Tracker App</h1>
        <h2>By Warren Hawker</h2>
      </header>
      <main>
        <AddExpense />
        <ExpensesTable />
      </main>
    </>
  );
}

export default App;
