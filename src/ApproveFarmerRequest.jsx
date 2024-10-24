// src/ApproveFarmerRequest.js
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const ApproveFarmerRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsCollection = await getDocs(collection(firestore, 'farmerRequests'));
        setRequests(requestsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching requests: ", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      const requestDoc = doc(firestore, 'farmerRequests', id);
      await updateDoc(requestDoc, { status: 'Approved' });
      alert("Request approved!");
      // Optionally, refresh the requests after approval
      // fetchRequests();
    } catch (error) {
      alert("Error approving request: " + error.message);
    }
  };

  return (
    <div>
      <h2>Approve Farmer Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.farmerName}: {request.schemeName} 
            <button onClick={() => handleApprove(request.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApproveFarmerRequest;
