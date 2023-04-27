import { useState } from 'react';
import { useAuth } from '../context/authContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      'https://food-expenses-tracker.vercel.app/api/user/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      //update auth context
      login(json);
      setIsLoading(false);
    }
  };
  return { loginUser, isLoading, error };
};
