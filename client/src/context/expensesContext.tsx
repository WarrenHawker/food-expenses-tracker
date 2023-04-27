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

  const editExpense = (_id:string, update:Expense):void => {
    setExpenses((prev) => {
      return prev.map((item) => {
        if(item._id == _id) {
          return {...update}
        } else return {...item}
      })
    })
  }

  const addExpense = (data:Expense): void => {
      setExpenses(prev => [data, ...prev])
  }

  const setExpensesData = ():void => {
    setExpenses([])
  }

  return (
    <ExpensesContext.Provider value={{expenses, addExpense, deleteExpense, editExpense, setExpensesData}}>
      {children}
    </ExpensesContext.Provider>
  );
};
