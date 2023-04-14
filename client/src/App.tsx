import AddExpense from './components/addExpense';
import Expenses from './components/expenses';

function App() {
  return (
    <>
      <header>
        <h1>Expenses Tracker App</h1>
        <h2>By Warren Hawker</h2>
      </header>
      <main>
        <AddExpense />
        <Expenses />
      </main>
    </>
  );
}

export default App;
