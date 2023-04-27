import AddExpense from './components/addExpense';
import ExpensesTableWeek from './components/expenses/expensesTableWeek';
import ExpensesTableMonth from './components/expenses/expensesTableMonth';
import { useState } from 'react';
import Header from './components/header';
import { useAuth } from './context/authContext';
import LoginForm from './components/auth/loginForm';
import SignupForm from './components/auth/signupForm';

function App() {
  const { user } = useAuth();
  const [showWeeklyView, setShowWeeklyView] = useState(false);
  return (
    <>
      <Header />
      <main>
        {user ? (
          <>
            <AddExpense />
            <button
              className='btn btn-primary'
              onClick={() => setShowWeeklyView((prev) => !prev)}>
              {showWeeklyView ? 'Show Monthly' : 'Show Weekly'}
            </button>
            {showWeeklyView ? <ExpensesTableWeek /> : <ExpensesTableMonth />}
          </>
        ) : (
          <section className='login-signup-forms'>
            <LoginForm /> <SignupForm />
          </section>
        )}
      </main>
    </>
  );
}

export default App;
