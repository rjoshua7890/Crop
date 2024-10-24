// src/ViewGovtSchemes.js
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import {  collection, getDocs } from 'firebase/firestore'; // Ensure you import the correct functions
import './ViewGovtSchemes.css'

const ViewGovtSchemes = () => {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const schemesCollection = collection(firestore, 'govtSchemes'); // Corrected this line
        const snapshot = await getDocs(schemesCollection);
        const schemesData = snapshot.docs.map(doc => doc.data());
        setSchemes(schemesData);
      } catch (error) {
        console.error("Error fetching government schemes: ", error);
      }
    };

    fetchSchemes();
  }, []);

  return (
    <div className='view-govt-scheme'>
    <h2>Government Schemes</h2>
    <ul className='scheme-list'>
      {schemes.map((scheme, index) => (
        <li key={index} className='scheme-item'>
          {scheme.name}: {scheme.details}
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default ViewGovtSchemes;
