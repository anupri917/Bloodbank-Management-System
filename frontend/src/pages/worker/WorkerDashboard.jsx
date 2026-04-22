import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkerDashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchInventory();
    fetchRequests();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setInventory(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRequests(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/requests/${id}/status?status=FULFILLED`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchRequests();
    } catch (e) {
      console.error(e);
    }
  };

  const cleanupExpired = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/inventory/cleanup', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchInventory();
      alert('Cleanup completed!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>Worker Dashboard</h2>
      
      <div className="glass" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Inventory Management</h3>
          <button className="btn-secondary" onClick={cleanupExpired}>Cleanup Expired Units</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Type</th>
              <th>Collection Date</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(unit => (
              <tr key={unit.id}>
                <td>{unit.id}</td>
                <td>{unit.bloodType}</td>
                <td>{unit.collectionDate}</td>
                <td>{unit.expiryDate}</td>
                <td>
                  <span style={{ color: unit.status === 'EXPIRED' ? 'var(--danger)' : 'var(--success)' }}>
                    {unit.status}
                  </span>
                </td>
              </tr>
            ))}
            {inventory.length === 0 && <tr><td colSpan="5">No blood units found</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="glass" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Blood Requests</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Requester</th>
              <th>Blood Type</th>
              <th>Units Needed</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.requester?.username}</td>
                <td>{req.bloodType}</td>
                <td>{req.quantityUnits}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === 'PENDING' && (
                    <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.9rem' }} onClick={() => approveRequest(req.id)}>
                      Approve & Fulfill
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && <tr><td colSpan="6">No requests found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerDashboard;
