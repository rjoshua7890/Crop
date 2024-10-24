// src/CropAndSchemePage.jsx
import React from 'react';
import PostCropDetails from './PostCropDetails';
import PostGovtSchemes from './PostGovtSchemes';

const Cropscheme = () => {
  return (
    <div>
      <h1>Crop and Government Schemes</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <PostCropDetails />
        </div>
        <div style={{ width: '45%' }}>
          <PostGovtSchemes />
        </div>
      </div>
    </div>
  );
};

export default Cropscheme;
