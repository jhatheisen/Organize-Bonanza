import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';

import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push('/');
  };

  const ulClassName = "profile-dropdown absolute top-12 right-0 bg-zinc-700 flex-col rounded" + (showMenu ? "" : " hidden");

  return (
    <>
      <li className="mr-6 flex">
        <button onClick={openMenu} className="p-3">
          <i className="fas fa-user-circle fa-2x" style={{color: '#60a5fa'}}/>
        </button>
      </li>
      <ul className={ulClassName} ref={ulRef}>
        <li className="p-2 text-m text-blue-500">{user.username}</li>
        <li className="p-2 text-m text-blue-500">{user.firstName} {user.lastName}</li>
        <li className="p-2 text-m text-blue-500">{user.email}</li>
        <li className='p-2'>
          <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
