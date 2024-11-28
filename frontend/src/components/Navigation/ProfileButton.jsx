import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaBars, FaUserCircle } from 'react-icons/fa'; // Profile icon
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-menu">
      <button onClick={toggleMenu} className="profile-icon">
        <FaBars/>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>Hello, {user.username}</li>
        <li>{user.email}</li>
        <li><NavLink to="/posts">Manage Posts</NavLink></li>
        <li><NavLink to="/comments/current">Manage Comments</NavLink></li>
        <li><button onClick={logout}>Log Out</button></li>
      </ul>
    </div>
  );
}

export default ProfileButton;
