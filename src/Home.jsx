import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='menu-bar'>
            <button onClick={toggleDropdown}>
                Menu
            </button>
            {isOpen && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li><Link to="/user">User Page</Link></li>
                    <li><Link to="/admin">Admin Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Home;
