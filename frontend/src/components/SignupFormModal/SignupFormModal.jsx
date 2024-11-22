import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/ModalContext';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    if (password === confirmPassword) {
      try {
        await dispatch(
          sessionActions.signup({
            email,
            username,           
            password,
          })
        );
        closeModal(); // Close the modal on successful signup
      } catch (res) {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors); // Display backend validation errors
        }
      }
    } else {
      // Handle password mismatch error
      setErrors({
        confirmPassword: 'Confirm Password field must be the same as the Password field',
      });
    }
  };


  const isButtonDisabled = username.length < 4 || password.length < 6;

  return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* Display email errors if present */}
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* Display username errors if present */}
        {errors.username && <p className="error-message">{errors.username}</p>}
        
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* Display password errors if present */}
        {errors.password && <p className="error-message">{errors.password}</p>}

        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {/* Display confirmPassword errors if present */}
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button 
          type="submit" 
          disabled={isButtonDisabled} 
          className={isButtonDisabled ? 'disabled-button' : 'enabled-button'}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
