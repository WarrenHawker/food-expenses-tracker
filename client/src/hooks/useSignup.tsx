import { useState } from 'react';
import { useAuth } from '../context/authContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, serverBaseURL } = useAuth();

  const signupUser = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${serverBaseURL}/api/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
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
  return { signupUser, isLoading, error };
};
