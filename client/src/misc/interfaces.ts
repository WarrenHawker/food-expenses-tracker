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
export interface CurrentWeek {
  weekBeginning: Date;
  weekEnding: Date;
}
export interface DateSelectorProps {
  currentWeek: CurrentWeek;
  currentMonth: number;
  prevWeek: () => void;
  nextWeek: () => void;
}
