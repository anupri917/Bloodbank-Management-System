import React from 'react';

const teamMembers = [
  { name: 'Anshuma', role: '', intro: '.' },
  { name: 'Brahmani', role: '', intro: '.' },
  { name: 'Dhammshila', role: '', intro: '.' },
  { name: 'Harshada', role: '', intro: '.' },
  { name: 'Manasvi', role: '', intro: '.' },
  { name: 'Saylee', role: '', intro: '.' },
];

const AboutTeam = () => {
  return (
    <div className="team-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>The Six Bytes</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Meet the six brilliant minds behind Apheresis.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {teamMembers.map((member, index) => (
          <div key={index} className="card glass" style={{ textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>
              {member.name[0]}
            </div>
            <h3>{member.name}</h3>
            <p style={{ color: 'var(--primary)', fontWeight: '500', marginBottom: '1rem' }}>{member.role}</p>
            <p>{member.intro}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
