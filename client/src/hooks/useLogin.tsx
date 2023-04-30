import { useState } from 'react';
import { useAuth } from '../context/authContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, serverBaseURL } = useAuth();

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${serverBaseURL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
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
