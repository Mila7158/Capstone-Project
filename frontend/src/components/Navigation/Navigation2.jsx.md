import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './Navigation.css';
import { useState, useEffect, useRef } from 'react';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const handleOpenModal = () => {
    setShowMenu(false); // Close the dropdown menu when opening a modal
  };

  const sessionLinks = sessionUser ? (
    <>
      <NavLink to="/posts/new" className="nav-button">
        Post
      </NavLink>
      <NavLink to="/posts" className="nav-button">
        My Posts
      </NavLink>
      <NavLink to="/comments" className="nav-button">
        My Comments
      </NavLink>
      <NavLink to="/" className="nav-button">
        Home
      </NavLink>
      <ProfileButton user={sessionUser} />
    </>
  ) : (
    <>
      <OpenModalButton
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
        onButtonClick={handleOpenModal}
      />
      <OpenModalButton
        buttonText="Sign Up"
        modalComponent={<SignupFormModal />}
        onButtonClick={handleOpenModal}
      />
    </>
  );

  return (
    <header className="navigation-header">
      <nav className="navigation">
        <NavLink to="/" className="logo">
          <img src="/logo.png" alt="FanConnect" />
        </NavLink>
        <div className="nav-buttons">
          {isLoaded && sessionLinks}
        </div>
        {!sessionUser && (
          <div ref={menuRef} className="dropdown">
            <button className="dropdown-toggle" onClick={toggleMenu}>
              <FaBars />
              <FaUserCircle />
            </button>
            {showMenu && (
              <ul className="menu-dropdown">
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                  onButtonClick={handleOpenModal}
                />
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                  onButtonClick={handleOpenModal}
                />
              </ul>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navigation;