import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginFormModal.css';
import { useModal } from '../../context/ModalContext';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const [isTyping, setIsTyping] = useState(false); 


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Log In button clicked with:", { credential, password });
        
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            });
    };

    const handleDemoLogin = () => {
        setErrors({});
        return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
            .then(() => {
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            });
    };

    const isButtonDisabled = credential.length < 4 || password.length < 6;

    const handleFocus = () => {
        setIsTyping(true);
    };

    const handleBlur = () => {
        setIsTyping(false);
    };

    return (
        <div className="login-modal">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        data-testid="credential-input"
                        onChange={(e) => setCredential(e.target.value)}
                        onFocus={handleFocus} 
                        onBlur={handleBlur}   
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        data-testid="password-input"
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={handleFocus}  
                        onBlur={handleBlur} 
                        required
                    />
                </label>
                {errors.credential && <p className="error-message">{errors.credential}</p>}

                {!isTyping && (  
                    <div className="login-buttons">
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className={isButtonDisabled ? 'disabled-button' : 'enabled-button'}
                        >
                            Log In
                        </button>

                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className="demo-login-button"
                            data-testid="login-button"
                        >
                            Log in as Demo User
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default LoginFormModal;