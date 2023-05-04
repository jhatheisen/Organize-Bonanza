import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from './logo.png';
import { useEffect } from 'react';

function Navigation({ isLoaded }){

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);

  const demoLogin = async (e) => {
    await dispatch(sessionActions.login({credential: "DemoUser1", password: "password1"}));
    history.push(`/orders`)
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <div className='flex'>
      <li className='mr-6'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
          className='p-4 text-xl text-blue-500 hover:text-blue-300'
        />
      </li>
      <li className='mr-6'>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
          className='p-4 text-xl text-blue-500 hover:text-blue-300'
        />
      </li>
      <li className='mr-6 flex p-2'>
        <button onClick={demoLogin} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>Demo User</button>
      </li>
      </div>
    );
  }

  return (
    <ul className='flex justify-between bg-zinc-700'>
      <div className='p-3'>
        <img src={logo} className='h-11'></img>
      </div>
      { sessionUser && (
        <li className='mr-6 flex'><NavLink exact to='/orders' className={'p-4 text-xl text-blue-500 hover:text-blue-300'}>Orders</NavLink></li>
        )}
      <li className='mr-6 flex'>
        { sessionUser &&
          <NavLink exact to="/products" className={'p-4 text-xl text-blue-500 hover:text-blue-300'}>Products</NavLink>
        }
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
