import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';


const UserPage = () => {
  return (
    <div className='menu-bar menu-bar2'>
      <h2>User Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/userlogin">User Login</Link></li>
          <li><Link to="/view-crop-details">View Crop Details</Link></li>
          <li><Link to="/view-govt-schemes">View Govt Schemes</Link></li>
          <li><Link to="/apply-for-schemes">Apply For Schemes</Link></li>
          <li><Link to="/view-status">View Status</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default UserPage;
