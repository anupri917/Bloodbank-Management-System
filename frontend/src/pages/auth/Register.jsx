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
    isGovtOfficer: false,
    bloodGroup: 'A+',
    bmi: '',
    haemoglobin: '',
    medicalHistory: '',
    isEmergencyDonor: false,
    empId: ''
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
      <div className="auth-card glass" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>Join Apheresis</h2>
        {error && <div style={{ color: 'var(--danger)', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleRegister} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          
          {/* Basic Info */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="ROLE_USER">Donor/Receiver</option>
              <option value="ROLE_WORKER">BloodBank Worker</option>
              <option value="ROLE_ADMIN">Administrator</option>
            </select>
          </div>

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
            <label>Blood Group</label>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* User/Donor Specific */}
          {formData.role === 'ROLE_USER' && (
            <>
              <div className="form-group">
                <label>BMI</label>
                <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} placeholder="e.g. 22.5" />
              </div>
              <div className="form-group">
                <label>Haemoglobin (g/dL)</label>
                <input type="number" step="0.1" name="haemoglobin" value={formData.haemoglobin} onChange={handleChange} placeholder="e.g. 13.5" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Medical History</label>
                <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Any prior illnesses, surgeries, etc." rows={2} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" name="isEmergencyDonor" checked={formData.isEmergencyDonor} onChange={handleChange} style={{ width: 'auto' }} />
                <label>Register as Emergency Donor (We can call you in critical shortages)</label>
              </div>
            </>
          )}

          {/* Worker Specific */}
          {formData.role === 'ROLE_WORKER' && (
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Employee ID</label>
              <input type="text" name="empId" value={formData.empId} onChange={handleChange} placeholder="e.g. WRK-1024" />
            </div>
          )}

          {/* Government / Security */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Government ID (For Security)</label>
            <input type="text" name="governmentId" value={formData.governmentId} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="isGovtOfficer" checked={formData.isGovtOfficer} onChange={handleChange} style={{ width: 'auto' }} />
            <label>I am a Government Officer (Eligible for discount)</label>
          </div>

          <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
