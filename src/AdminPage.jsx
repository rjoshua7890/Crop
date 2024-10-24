import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase'; // Ensure this imports the firestore instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminPage.css';

const AdminPage = () => {
  const [farmerRequests, setFarmerRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFarmerRequests = async () => {
      try {
        const requestsCollection = collection(firestore, 'farmerRequests');
        const q = query(requestsCollection, where('status', '==', 'Pending'));
        const snapshot = await getDocs(q);
        setFarmerRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching farmer requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerRequests();
  }, []);

  const handleApproveRequest = async (requestId) => {
    try {
      const requestDoc = doc(firestore, 'farmerRequests', requestId);
      await updateDoc(requestDoc, { status: 'Approved' });
      alert("Request approved successfully!");
      setFarmerRequests(farmerRequests.filter(request => request.id !== requestId));
    } catch (error) {
      alert(`Error approving request: ${error.message}`);
    }
  };

  return (
    <div className='admin-page'>
      <h2>Admin Dashboard</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3>Post Crop Details</h3>
          <button onClick={() => navigate('/post-crop-details')}>Post Crop Details</button>
        </div>

        <div>
          <h3>Post Government Scheme</h3>
          <button onClick={() => navigate('/post-govt-schemes')}>Post Government Scheme</button>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3>Approve Farmer Scheme Requests</h3>
        {loading ? (
          <p>Loading requests...</p>
        ) : farmerRequests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {farmerRequests.map(request => (
              <li key={request.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span>{request.schemeName} (Farmer ID: {request.farmerId})</span>
                <button onClick={() => handleApproveRequest(request.id)}>Approve</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
