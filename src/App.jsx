// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import UserLogin from './UserLogin';
import PostCropDetails from './PostCropDetails';
import PostGovtSchemes from './PostGovtSchemes';
import ApproveFarmerRequest from './ApproveFarmerRequest';
import ViewCropDetails from './ViewCropDetails';
import ViewGovtSchemes from './ViewGovtSchemes';
import ApplyForSchemes from './ApplyForSchemes';
import ViewStatus from './ViewStatus';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';
import UserPage from './Userpage';
import Home from './Home';
import Cropscheme from './Cropscheme';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/post-crop-details" element={<PostCropDetails />} />
          <Route path="/post-govt-schemes" element={<PostGovtSchemes />} />
          <Route path="/approve-farmer-request" element={<ApproveFarmerRequest />} />
          <Route path="/view-crop-details" element={<ViewCropDetails />} />
          <Route path="/view-govt-schemes" element={<ViewGovtSchemes />} />
          <Route path="/apply-for-schemes" element={<ApplyForSchemes />} />
          <Route path="/view-status" element={<ViewStatus />} />
          <Route path="/" element={<Home />} />
          <Route path="/cs" element={<Cropscheme />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
