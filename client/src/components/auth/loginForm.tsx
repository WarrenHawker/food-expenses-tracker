import { useLogin } from '../../hooks/useLogin';
import { FormEvent, useState } from 'react';

function LoginForm() {
  const { loginUser, error, isLoading } = useLogin();
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(emailInput, passwordInput);
  };

  return (
    <div className='form-container'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Login</h2>
        <div className='input-container'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <a href=''>Forgot your password?</a>
        {error ? <p className='error'>{error}</p> : null}
        <button
          disabled={isLoading ? true : false}
          className='btn btn-primary'
          type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
