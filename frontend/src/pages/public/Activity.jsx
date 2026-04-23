import React from 'react';

const Activity = () => {
  return (
    <div className="activity-container" style={{ padding: '2rem' }}>
      <h1>Activity Gallery</h1>
      <p>A look back at our successful blood donation camps and events.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '200px', backgroundColor: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Camp Photo {i}</span>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3>Community Drive #{i}</h3>
              <p>Successfully collected 100+ units of blood with amazing participation from local residents.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
