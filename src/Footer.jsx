import React from 'react';
import './Footer.css';
import { assets } from './assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
          <img className='logo' src={assets.aa} alt="aa" />
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-center">
          <p>@This site is designed, developed, hosted and maintained by National Informatics Centre, Ministry of Electronics & Information Technology, Government of India.</p>
          <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.dl} alt="Logo digital india" />
            </a>
            </div>
        <div className="footer-right">
          <div className="footer-disclaimer">
            <p>Disclaimer</p>
        
            <a href="https://www.nic.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.l} alt="Logo L" />
            </a>
            <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer">
              <img src={assets.india} alt="Logo india" />
            </a>
            </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© 2024 Your Company Name. All rights reserved.</p>
    </div>
  );
}

export default Footer;
