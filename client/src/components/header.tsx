import { dateToWordString } from '../misc/functions';
import { useAuth } from '../context/authContext';
import { useLogout } from '../hooks/useLogout';
function Header() {
  const { user } = useAuth();
  const { logoutUser } = useLogout();
  return (
    <header>
      <section className='head-section'>
        <div className='title-container'>
          <h1>Expenses Tracker App</h1>
          <h4>By Warren Hawker</h4>
        </div>
        {user ? (
          <div>
            <h2>Hi {user.name}</h2>
            <button className='btn-logout' onClick={logoutUser}>
              Logout
            </button>
          </div>
        ) : (
          <></>
        )}
        <h3>{dateToWordString(new Date())}</h3>
      </section>
    </header>
  );
}

export default Header;
