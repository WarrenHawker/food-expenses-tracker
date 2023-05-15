import {
  useEffect,
  useContext,
  createContext,
  useState,
  ReactNode,
} from 'react';
import { User, useAuthProps } from '../misc/interfaces';

const AuthContext = createContext({} as useAuthProps);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  // const serverBaseURL = 'https://food-expenses-server.onrender.com';
  // const serverBaseURL = 'http://localhost:5000';
  const serverBaseURL = 'https://food-expenses-tracker.vercel.app/';

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (!userStorage) {
      return;
    }
    setUser(JSON.parse(userStorage));
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ serverBaseURL, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
