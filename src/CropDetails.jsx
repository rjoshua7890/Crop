// src/CropDetails.js
import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

const CropDetails = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      const cropsCollection = await firestore.collection('crops').get();
      setCrops(cropsCollection.docs.map(doc => doc.data()));
    };

    fetchCrops();
  }, []);

  return (
    <div>
      <h2>Crop Details</h2>
      <ul>
        {crops.map((crop, index) => (
          <li key={index}>{crop.name}: {crop.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default CropDetails;
