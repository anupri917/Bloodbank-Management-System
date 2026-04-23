import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)' }}>Apheresis</h1>
        <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
          "From heart to heart - through every drop"
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => navigate('/login')} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Donate Blood</button>
          <button className="btn-secondary" onClick={() => navigate('/login')} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>Request Blood</button>
        </div>
      </section>

      {/* Benefits and Quotes */}
      <section className="card" style={{ margin: '2rem' }}>
        <h2>Why Donate Blood?</h2>
        <p>Donating blood saves lives. Every drop can bring hope to someone in need.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="card glass">
            <h3>Save Lives</h3>
            <p>One donation can save up to 3 lives.</p>
          </div>
          <div className="card glass">
            <h3>Health Benefits</h3>
            <p>Regular donation improves heart health and burns calories.</p>
          </div>
          <div className="card glass">
            <h3>Community</h3>
            <p>Become a hero in your local community.</p>
          </div>
        </div>
      </section>

      {/* Compatibility Chart */}
      <section className="card" style={{ margin: '2rem' }}>
        <h2>Blood Compatibility Chart</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Can Donate To</th>
                <th>Can Receive From</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>O-</td>
                <td>Everyone (Universal Donor)</td>
                <td>O-</td>
              </tr>
              <tr>
                <td>O+</td>
                <td>O+, A+, B+, AB+</td>
                <td>O+, O-</td>
              </tr>
              <tr>
                <td>A-</td>
                <td>A+, A-, AB+, AB-</td>
                <td>A-, O-</td>
              </tr>
              <tr>
                <td>A+</td>
                <td>A+, AB+</td>
                <td>A+, A-, O+, O-</td>
              </tr>
              <tr>
                <td>B-</td>
                <td>B+, B-, AB+, AB-</td>
                <td>B-, O-</td>
              </tr>
              <tr>
                <td>B+</td>
                <td>B+, AB+</td>
                <td>B+, B-, O+, O-</td>
              </tr>
              <tr>
                <td>AB-</td>
                <td>AB+, AB-</td>
                <td>AB-, A-, B-, O-</td>
              </tr>
              <tr>
                <td>AB+</td>
                <td>AB+</td>
                <td>Everyone (Universal Receiver)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Eligibility Rules */}
      <section className="card" style={{ margin: '2rem' }}>
        <h2>Eligibility Rules</h2>
        <ul>
          <li>Must be between 18 and 65 years old.</li>
          <li>Must weigh at least 50 kg.</li>
          <li>Must not have had a tattoo or piercing in the last 6 months.</li>
          <li>Must be in good health and not suffering from any cold, flu, or other illness.</li>
          <li>Haemoglobin level should be 12.5 g/dL or higher.</li>
        </ul>
      </section>
      
      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
        <p>&copy; 2026 Apheresis. All rights reserved.</p>
        <p>The Six Bytes Team</p>
      </footer>
    </div>
  );
};

export default Home;
