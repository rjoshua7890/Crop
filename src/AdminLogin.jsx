import React, { useState } from 'react';
import './AdminLogin.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { assets } from './assets/assets';

const AdminLogin = () => {
    const [currState, setCurrState] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const adminCredential = await signInWithEmailAndPassword(auth, email, password);
            setError(''); // Clear error on successful login
            alert('Admin login successful!');
            navigate('/adminpage'); // Redirect to dashboard
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };
 
    const handleSignUp = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          alert('Admin registration successful!');
        } catch (err) {
          setError(err.message);
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currState === "Login") {
            handleLogin();
        } else {
            handleSignUp();  // Implement signup logic if needed
        }
    };

    const handleStateChange = (newState) => {
        setCurrState(newState);
        setError(''); // Clear error when changing state
        setEmail(''); // Optionally clear email
        setPassword(''); // Optionally clear password
    };

    return (
        <div className='admin-popup'>
            <form className="admin-popup-container" onSubmit={handleSubmit}>
                <div className="admin-popup-title">
                    <h2>{currState} Admin</h2>
                    <Link to='/' className="close-link">
                        <img src={assets.cross_icon} alt="" />
                    </Link>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="admin-popup-inputs">
                    <input
                        type="email"
                        placeholder='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type={loading ? "text" : "password"} // Toggle password visibility
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : (currState === "Sign Up" ? "Create account" : "Login")}
                </button>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => handleStateChange("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => handleStateChange("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default AdminLogin;
