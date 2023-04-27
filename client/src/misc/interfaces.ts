export interface Expense {
  _id: string;
  company: string;
  date: Date;
  amount: string;
  notes: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface EditedExpense {
  company: string | null;
  date: Date | null;
  amount: string | null;
  notes: string | null;
}

export interface UseExpensesProps {
  expenses: Expense[];
  addExpense: (data: Expense) => void;
  deleteExpense: (_id: string) => void;
  editExpense: (_id: string, update: Expense) => void;
  setExpensesData: () => void;
}

export interface useAuthProps {
  user: User | undefined;
  login: (newUser: User) => void;
  logout: () => void;
}
export interface CurrentWeek {
  weekBeginning: Date;
  weekEnding: Date;
}
export interface DateSelectorProps {
  currentWeek?: CurrentWeek;
  currentMonth?: number;
  currentYear?: number;
  changeDates: (option: string) => void;
}
