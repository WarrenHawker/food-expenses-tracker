import { useAuth } from '../context/authContext';
import { useExpenses } from '../context/expensesContext';

export const useLogout = () => {
  const { setExpensesData } = useExpenses();
  const { logout } = useAuth();

  const logoutUser = () => {
    logout();
    localStorage.removeItem('user');
    setExpensesData();
  };
  return { logoutUser };
};
