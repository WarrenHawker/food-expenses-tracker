import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ExpenseContextProvider } from './context/expensesContext';
import { AuthContextProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <ExpenseContextProvider>
      <App />
    </ExpenseContextProvider>
  </AuthContextProvider>
);
