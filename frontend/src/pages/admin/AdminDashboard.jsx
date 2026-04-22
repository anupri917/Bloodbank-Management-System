import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0, totalBloodUnits: 0 });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // In a real app, these would be fetched via specialized endpoints
    // For now we mock the data since admin doesn't have a direct stats endpoint defined yet
    // or we can fetch requests and users if we expose those.
    setStats({
      totalUsers: 45,
      totalRequests: 12,
      totalBloodUnits: 120
    });

    setInventory([
      { bloodType: 'A+', count: 30 },
      { bloodType: 'O-', count: 15 },
      { bloodType: 'B+', count: 25 },
      { bloodType: 'AB+', count: 10 },
    ]);
  }, []);

  const pieData = {
    labels: inventory.map(i => i.bloodType),
    datasets: [
      {
        data: inventory.map(i => i.count),
        backgroundColor: ['#FF4B4B', '#2B2B2B', '#10b981', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '2rem' }}>Administrator Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card glass">
          <p>Total Registered Users</p>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        <div className="stat-card glass">
          <p>Total Blood Requests</p>
          <div className="stat-value">{stats.totalRequests}</div>
        </div>
        <div className="stat-card glass">
          <p>Total Blood Units Available</p>
          <div className="stat-value">{stats.totalBloodUnits}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Blood Availability (Units)</h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Monthly Overview</h3>
          {/* Mock bar chart */}
          <div style={{ height: '300px' }}>
            <Bar 
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [{
                  label: 'Donations',
                  data: [12, 19, 3, 5],
                  backgroundColor: '#FF4B4B',
                }]
              }} 
              options={{ maintainAspectRatio: false }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
