import React, { useState, useEffect } from 'react';
import { firestore, auth } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import './ApplyForschemes.css'
const ApplyForSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedSchemeId, setSelectedSchemeId] = useState('');
  const [selectedSchemeDetails, setSelectedSchemeDetails] = useState({ name: '', details: '' });

  // Fetch government schemes
  const fetchSchemes = async () => {
    try {
      const schemesCollection = collection(firestore, 'govtSchemes');
      const schemesSnapshot = await getDocs(schemesCollection);
      const schemesList = schemesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchemes(schemesList);
    } catch (error) {
      console.error("Error fetching schemes: ", error);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  // Handle scheme selection
  const handleSchemeChange = (e) => {
    const selectedSchemeId = e.target.value;
    const selectedScheme = schemes.find(scheme => scheme.id === selectedSchemeId);
    setSelectedSchemeId(selectedSchemeId);
    setSelectedSchemeDetails(selectedScheme ? { name: selectedScheme.name, details: selectedScheme.details } : { name: '', details: '' });
  };

  // Handle application submission
  const handleApply = async () => {
    const user = auth.currentUser;
    if (user) {
      if (!selectedSchemeId) {
        alert("Please select a scheme before applying.");
        return;
      }
      try {
        await addDoc(collection(firestore, 'farmerRequests'), {
          farmerId: user.uid,
          schemeId: selectedSchemeId,
          schemeName: selectedSchemeDetails.name,
          status: 'Pending',
        });
        alert("Application submitted!");
      } catch (error) {
        alert("Error submitting application: " + error.message);
      }
    } else {
      alert("You need to be logged in to apply.");
    }
  };

  return (
    <div className="apply-for-scheme">
  <h2>Apply for Government Schemes</h2>
  <select onChange={handleSchemeChange} value={selectedSchemeId}>
    <option value="">Select a Scheme</option>
    {schemes.map((scheme) => (
      <option key={scheme.id} value={scheme.id}>{scheme.name}</option>
    ))}
  </select>
  {selectedSchemeDetails.name && (
    <div>
      <h3>Scheme Details</h3>
      <p><strong>Name:</strong> {selectedSchemeDetails.name}</p>
      <p><strong>Details:</strong> {selectedSchemeDetails.details}</p>
    </div>
  )}
  <button onClick={handleApply}>Apply</button>
</div>
  );
};

export default ApplyForSchemes;
