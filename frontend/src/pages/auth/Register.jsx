import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'ROLE_USER',
    governmentId: '',
    isGovtOfficer: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>Join BloodBank</h2>
        {error && <div style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="ROLE_USER">Donor/Receiver</option>
              <option value="ROLE_WORKER">BloodBank Worker</option>
              <option value="ROLE_ADMIN">Administrator</option>
            </select>
          </div>
          <div className="form-group">
            <label>Government ID (For Security)</label>
            <input type="text" name="governmentId" value={formData.governmentId} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="isGovtOfficer" checked={formData.isGovtOfficer} onChange={handleChange} style={{ width: 'auto' }} />
            <label>I am a Government Officer (Eligible for discount)</label>
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
