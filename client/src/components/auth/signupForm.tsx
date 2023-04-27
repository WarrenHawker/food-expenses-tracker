import { useSignup } from '../../hooks/useSignup';
import { FormEvent, useState } from 'react';

function SignupForm() {
  const { signupUser, error, isLoading } = useSignup();
  const [nameInput, setNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupUser(nameInput, emailInput, passwordInput);
  };

  return (
    <div>
      <div className='form-container'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Signup</h2>
          <div className='input-container'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
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
          {error ? <p className='error'>{error}</p> : null}
          <button
            disabled={isLoading ? true : false}
            className='btn btn-primary'
            type='submit'>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
