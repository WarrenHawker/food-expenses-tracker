export interface Expense {
  _id: string;
  company: string;
  date: Date;
  amount: string;
  notes: string;
}

export interface UseExpensesProps {
  expenses: Expense[];
  addExpense: (data: Expense) => void;
  deleteExpense: (_id: string) => void;
}
