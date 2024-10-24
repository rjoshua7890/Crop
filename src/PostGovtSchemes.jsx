import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './PostGovtSchemes.css';

const PostGovtSchemes = () => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [crops, setCrops] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');
  const [editSchemeId, setEditSchemeId] = useState(null); // State for editing

  const fetchCrops = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'crops'));
    const cropsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCrops(cropsData);
  };

  const fetchSchemes = async () => {
    setFetchLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'govtSchemes'));
      const schemesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSchemes(schemesData);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setError("Failed to fetch schemes.");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCrops();
      await fetchSchemes();
    };
    fetchData();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editSchemeId) {
        // Update existing scheme
        await updateDoc(doc(firestore, 'govtSchemes', editSchemeId), { name, details });
        alert("Government scheme updated!");
        setSchemes(schemes.map(scheme => scheme.id === editSchemeId ? { ...scheme, name, details } : scheme));
      } else {
        // Create new scheme
        const schemeDoc = await addDoc(collection(firestore, 'govtSchemes'), { name, details });
        alert("Government scheme posted!");

        if (selectedCropId) {
          await addDoc(collection(firestore, 'crops', selectedCropId, 'schemes'), {
            schemeId: schemeDoc.id,
            name,
            details,
          });
          alert("Scheme applied to crop!");
        }
        setSchemes(prev => [...prev, { id: schemeDoc.id, name, details }]); // Optimistic update
      }

      // Reset form fields
      setSelectedCropId('');
      setName('');
      setDetails('');
      setEditSchemeId(null); // Reset edit state
    } catch (error) {
      console.error("Error saving scheme:", error);
      setError(editSchemeId ? "Failed to update scheme." : "Failed to post scheme.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (schemeId) => {
    setError('');
    try {
      await deleteDoc(doc(firestore, 'govtSchemes', schemeId));
      alert("Scheme deleted!");
      setSchemes(schemes.filter(scheme => scheme.id !== schemeId));
    } catch (error) {
      console.error("Error deleting scheme:", error);
      setError("Failed to delete scheme.");
    }
  };

  const handleEdit = (scheme) => {
    setEditSchemeId(scheme.id);
    setName(scheme.name);
    setDetails(scheme.details);
    setSelectedCropId(''); // Reset or set to specific crop if needed
  };

  return (
    <div className='post-govt-scheme'>
  <h2 className='scheme-title'>{editSchemeId ? "Edit Government Scheme" : "Post Government Schemes"}</h2>
  {loading && <p className='loading-text'>Loading...</p>}
  {fetchLoading && <p className='loading-text'>Loading schemes...</p>}
  {error && <p className='error-text'>{error}</p>}
  <form className='scheme-form' onSubmit={handlePost}>
    <select 
      className='crop-select' 
      value={selectedCropId} 
      onChange={(e) => setSelectedCropId(e.target.value)}
      required
    >
      <option value="">Select Crop</option>
      {crops.map(crop => (
        <option key={crop.id} value={crop.id}>{crop.name}</option>
      ))}
    </select>
    
    <input 
      className='scheme-input' 
      type="text" 
      placeholder="Scheme Name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required 
    />
    
    <textarea 
      className='scheme-textarea' 
      placeholder="Details" 
      value={details} 
      onChange={(e) => setDetails(e.target.value)} 
      required 
    />
    
    <button className='submit-button' type="submit" disabled={loading}>
      {editSchemeId ? "Update Scheme" : "Post Scheme"}
    </button>
  </form>

  <h3 className='posted-schemes-title'>Posted Government Schemes</h3>
  <ul className='schemes-list'>
    {schemes.map(scheme => (
      <li key={scheme.id} className='scheme-item'>
        <h4 className='scheme-name'>{scheme.name}</h4>
        <p className='scheme-details'>{scheme.details}</p>
        <button className='edit-button' onClick={() => handleEdit(scheme)}>Edit</button>
        <button className='delete-button' onClick={() => handleDelete(scheme.id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default PostGovtSchemes;
