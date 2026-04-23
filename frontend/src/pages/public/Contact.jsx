import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ orgName: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ orgName: '', email: '', message: '' });
  };

  return (
    <div className="contact-container" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div className="card glass">
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Contact / Join Us</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Are you an organization looking to collaborate or host a blood donation camp? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Organization Name</label>
            <input 
              type="text" 
              required 
              value={formData.orgName}
              onChange={(e) => setFormData({...formData, orgName: e.target.value})}
              placeholder="e.g. HealthCorp Inc."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Contact Email</label>
            <input 
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="contact@org.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message / Proposal</label>
            <textarea 
              required 
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="How would you like to collaborate?"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
