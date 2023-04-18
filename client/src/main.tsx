import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ExpenseContextProvider } from './context/expensesContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ExpenseContextProvider>
    <App />
  </ExpenseContextProvider>
);
