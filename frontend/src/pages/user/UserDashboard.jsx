import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';

const UserDashboard = () => {
  const [mode, setMode] = useState('DONOR'); // DONOR or RECEIVER
  const [donations, setDonations] = useState([]);
  const [bloodType, setBloodType] = useState('A+');
  const [quantity, setQuantity] = useState(350);
  const [reqUnits, setReqUnits] = useState(1);
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    fetchDonations();
    fetchMyRequests();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/donations', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDonations(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/requests/my-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMyRequests(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/user/donate', {
        bloodType,
        quantityMl: quantity
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Thank you for your donation!');
      fetchDonations();
    } catch (e) {
      alert('Error logging donation');
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/requests', {
        bloodType,
        quantityUnits: reqUnits
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Request submitted successfully!');
      fetchMyRequests();
    } catch (e) {
      alert('Error submitting request');
    }
  };

  const downloadCertificate = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/donations/${id}/certificate`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Donation_Certificate.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      alert('Could not download certificate');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Dashboard</h2>
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
          <button 
            className={mode === 'DONOR' ? 'btn-primary' : 'btn-secondary'} 
            onClick={() => setMode('DONOR')}
            style={{ border: 'none' }}
          >
            I am a Donor
          </button>
          <button 
            className={mode === 'RECEIVER' ? 'btn-primary' : 'btn-secondary'} 
            onClick={() => setMode('RECEIVER')}
            style={{ border: 'none' }}
          >
            I need Blood
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          {mode === 'DONOR' ? (
            <>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Log a New Donation</h3>
              <form onSubmit={handleDonate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label>Blood Type</label>
                  <select value={bloodType} onChange={e => setBloodType(e.target.value)}>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity (ml)</label>
                  <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary">Submit Donation</button>
              </form>
            </>
          ) : (
            <>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Request Blood</h3>
              <form onSubmit={handleRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label>Required Blood Type</label>
                  <select value={bloodType} onChange={e => setBloodType(e.target.value)}>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Units Needed</label>
                  <input type="number" value={reqUnits} onChange={e => setReqUnits(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary">Submit Request</button>
              </form>
            </>
          )}
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Find Us</h3>
          <p style={{ marginBottom: '1rem' }}>Visit our center to donate or collect blood.</p>
          <GoogleMapComponent />
        </div>
      </div>

      <div className="glass" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          {mode === 'DONOR' ? 'My Donation History' : 'My Requests'}
        </h3>
        
        <table className="data-table">
          <thead>
            {mode === 'DONOR' ? (
              <tr>
                <th>Date</th>
                <th>Blood Type</th>
                <th>Quantity (ml)</th>
                <th>Certificate</th>
              </tr>
            ) : (
              <tr>
                <th>Date</th>
                <th>Blood Type</th>
                <th>Units</th>
                <th>Status</th>
              </tr>
            )}
          </thead>
          <tbody>
            {mode === 'DONOR' ? (
              donations.map(d => (
                <tr key={d.id}>
                  <td>{d.donationDate}</td>
                  <td>{d.bloodType}</td>
                  <td>{d.quantityMl}</td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => downloadCertificate(d.id)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              myRequests.map(r => (
                <tr key={r.id}>
                  <td>{r.requestDate?.substring(0, 10)}</td>
                  <td>{r.bloodType}</td>
                  <td>{r.quantityUnits}</td>
                  <td>{r.status}</td>
                </tr>
              ))
            )}
            {(mode === 'DONOR' ? donations : myRequests).length === 0 && (
              <tr>
                <td colSpan="4">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
