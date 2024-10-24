// src/PostCropDetails.jsx
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import './PostCropDetails.css'

const PostCropDetails = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const fetchCrops = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'crops'));
      const cropsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCrops(cropsData);
    };

    fetchCrops();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(firestore, 'crops'), {
        name,
        details,
        completed: false,
      });
      alert("Crop details posted!");
      setCrops([...crops, { id: docRef.id, name, details, completed: false }]); // Update local state
      setName('');
      setDetails('');
    } catch (error) {
      console.error("Error posting crop details:", error);
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'crops', id));
      setCrops(crops.filter(crop => crop.id !== id)); // Update local state
      alert("Crop details deleted!");
    } catch (error) {
      console.error("Error deleting crop details:", error);
      alert(error.message);
    }
  };

  return (
    <div className="post-crop-details">
  <h2>Post Crop Details</h2>
  <form onSubmit={handlePost} className="form-container">
    <input 
      type="text" 
      placeholder="Crop Name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required 
      className="input-field" 
    />
    <textarea 
      placeholder="Details" 
      value={details} 
      onChange={(e) => setDetails(e.target.value)} 
      required 
      className="textarea-field" 
    />
    <button type="submit" className="submit-button">Post</button>
  </form>

  <h3 className="posted-crops-title">Posted Crops</h3>
  <ul className="crops-list">
    {crops.map(crop => (
      <li key={crop.id} className="crop-item">
        <h4 className="crop-title">{crop.name}</h4>
        <p className="crop-details">{crop.details}</p>
        <button onClick={() => handleDelete(crop.id)} className="delete-button">Delete</button>
      </li>
    ))}
  </ul>
</div>
  );
};

export default PostCropDetails;
