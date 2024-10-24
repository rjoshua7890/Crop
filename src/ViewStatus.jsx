// src/ViewStatus.js
import React, { useState, useEffect } from 'react';
import { firestore, auth } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './ViewStatus.css'

const ViewStatus = () => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(
            collection(firestore, 'farmerRequests'),
            where('farmerId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          setStatus(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Include doc ID
        } catch (err) {
          setError('Error fetching status: ' + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='viewstatus'>
      <h2>Application Status</h2>
      <ul>
        {status.length > 0 ? (
          status.map((app) => (
            <li key={app.id}>{app.schemeName}: {app.status}</li> // Use unique ID as key
          ))
        ) : (
          <li>No applications found.</li>
        )}
      </ul>
    </div>
  );
};

export default ViewStatus;
