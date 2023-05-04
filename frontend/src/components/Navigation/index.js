import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const demoLogin = (e) => {
    dispatch(sessionActions.login({credential: "DemoUser1", password: "password1"}));
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
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
        <button onClick={demoLogin}>Demo User</button>
      </li>
    );
  }

  return (
    <ul>
      <li>
        { sessionUser ?
          <NavLink exact to="/products">Products</NavLink> :
          <NavLink exact to="/splash">Products</NavLink>
        }
      </li>
      { sessionUser && (
        <li><NavLink exact to='/orders'>Orders</NavLink></li>
        )}
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
