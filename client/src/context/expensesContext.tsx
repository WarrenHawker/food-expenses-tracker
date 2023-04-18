import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Expense, UseExpensesProps } from '../misc/interfaces';

const ExpensesContext = createContext({} as UseExpensesProps);

export const useExpenses = () => useContext(ExpensesContext);
//prettier-ignore
export const ExpenseContextProvider = ({ children }: {children:ReactNode}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch('http://localhost:5000/api/expenses');
    const data = await response.json();
    setExpenses(data);
  };

  const deleteExpense = (_id:string):void => {
    setExpenses(prev => prev.filter((item) => item._id !=_id))
  }

  const addExpense = (data:Expense): void => {
      setExpenses(prev => [data, ...prev])
  }

  return (
    <ExpensesContext.Provider value={{expenses, addExpense, deleteExpense}}>
      {children}
    </ExpensesContext.Provider>
  );
};
