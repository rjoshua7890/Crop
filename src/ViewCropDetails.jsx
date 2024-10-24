// src/ViewCropDetails.js
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs } from 'firebase/firestore'; // Ensure you import the correct functions
import './ViewCropDetails.css'

const ViewCropDetails = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const cropsCollection = collection(firestore, 'crops'); // Corrected this line
        const snapshot = await getDocs(cropsCollection);
        const cropsData = snapshot.docs.map(doc => doc.data());
        setCrops(cropsData);
      } catch (error) {
        console.error("Error fetching crop details: ", error);
      }
    };

    fetchCrops();
  }, []);

  return (
    <div className='view-crop-details'>
  <h2>Crop Details</h2>
  <ul className='crop-list'>
    {crops.map((crop, index) => (
      <li key={index}>{crop.name}: {crop.details}</li>
    ))}
  </ul>
</div>

  );
};

export default ViewCropDetails;
