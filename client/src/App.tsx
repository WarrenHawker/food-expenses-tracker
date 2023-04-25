import AddExpense from './components/addExpense';
import ExpensesTableWeek from './components/expensesTableWeek';
import ExpensesTableMonth from './components/expensesTableMonth';
import { useState } from 'react';
import { dateToWordString } from './misc/functions';

function App() {
  const [showWeeklyView, setShowWeeklyView] = useState(false);
  return (
    <>
      <header>
        <section className='head-section'>
          <div className='title-container'>
            <h1>Expenses Tracker App</h1>
            <h4>By Warren Hawker</h4>
          </div>
          <h2>Hi Warren</h2>
          <h3>{dateToWordString(new Date())}</h3>
        </section>
      </header>
      <main>
        <AddExpense />
        <button
          className='btn btn-primary'
          onClick={() => setShowWeeklyView((prev) => !prev)}>
          {showWeeklyView ? 'Show Monthly' : 'Show Weekly'}
        </button>
        {showWeeklyView ? <ExpensesTableWeek /> : <ExpensesTableMonth />}
      </main>
    </>
  );
}

export default App;
