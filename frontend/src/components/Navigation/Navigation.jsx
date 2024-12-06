import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { sessionActions } from '../../store/session';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
    setShowMenu(false);
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

  return (
    <header>
      <div className="container">
        <div className="navigation-header">
          <nav className="navigation">
            <div className='navigation-left'>
              <NavLink to="/" className="logo-link">
                <div className="logo-container">
                  <img src="/basketball-logo.png" alt="FanConnect Logo" className="logo" />
                  <span className="site-name">FanConnect</span>
                </div>
              </NavLink>

              <div className="nav-buttons">

                {sessionUser && (
                  <>
                    <NavLink to="/posts/new" className="nav-button">
                      Post
                    </NavLink>
                    <NavLink to="posts/current" className="nav-button">
                      My Posts
                    </NavLink>
                    <NavLink to="/comments/current" className="nav-button">
                      My Comments
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            <div className="dropdown" ref={menuRef}>
              {sessionUser && (
                <span className="greeting-message">
                  Hello, {sessionUser.username}
                </span>
              )}
              <button className="dropdown-toggle" onClick={toggleMenu}>
                <FaUserCircle />
              </button>
              {showMenu && (
                <ul className="menu-dropdown">
                  {sessionUser ? (
                    <li>
                      <button className='btn-danger' onClick={handleLogout}>Log Out</button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <OpenModalButton
                          buttonText="Log In"
                          modalComponent={<LoginFormModal />}
                        />
                      </li>
                      <li>
                        <OpenModalButton
                          buttonText="Sign Up"
                          modalComponent={<SignupFormModal />}
                        />
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
