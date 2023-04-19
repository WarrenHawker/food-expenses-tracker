import AddExpense from './components/addExpense';
import ExpensesTableWeek from './components/expensesTableWeek';
import ExpensesTableMonth from './components/expensesTableMonth';
import { useState } from 'react';

function App() {
  const [showWeeklyView, setShowWeeklyView] = useState(false);
  return (
    <>
      <header>
        <h1>Expenses Tracker App</h1>
        <h2>By Warren Hawker</h2>
      </header>
      <main>
        <AddExpense />
        <button onClick={() => setShowWeeklyView((prev) => !prev)}>
          Switch View
        </button>
        {showWeeklyView ? <ExpensesTableWeek /> : <ExpensesTableMonth />}
      </main>
    </>
  );
}

export default App;
