import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './Navigation.css';
import { useState, useEffect, useRef } from 'react';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import { useModal } from '../../context/ModalContext';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(); 
  // const { closeModal } = useModal();

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
      <li>
        <NavLink to="/posts/new" className="create-post-link">
          Create Post
        </NavLink>
      </li>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
      <li>
        <OpenModalButton 
          buttonText="Sign Up" 
          modalComponent={<SignupFormModal />} 
          onButtonClick={handleOpenModal}  
        />
      </li>
      <li>
        <OpenModalButton 
          buttonText="Log In" 
          modalComponent={<LoginFormModal />} 
          onButtonClick={handleOpenModal}   // Close menu and any open modal
        />
      </li>
    </>
  );

  return (
    <header>
      <nav className="navigation">
        <NavLink to="/" className="logo">
          <img src="/logo.png" alt="Logo" data-test-id="logo" />
        </NavLink>
        <ul>
          {isLoaded && (
            <div className="icon-container" ref={menuRef}> 
              {!sessionUser && (
                <button className="ham-button" onClick={toggleMenu}>
                  <FaBars />
                  <FaUserCircle/>
                </button>
              )}
              {showMenu && !sessionUser && (
                <ul className="menu-dropdown">
                  {sessionLinks}
                </ul>
              )}
              {sessionUser && (
                <>
                  <li>
                    <NavLink to="/posts/new" className="create-post-link">
                      Create Post
                    </NavLink>
                  </li>
                  <ProfileButton user={sessionUser} />
                </>
              )}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
