import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalRequests: 0, totalBloodUnits: 0, criticalAlerts: 0 });
  const [inventory, setInventory] = useState([]);
  const [requests, setRequests] = useState([]);

  const COLORS = ['#d32f2f', '#ff6659', '#b71c1c', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const invRes = await axios.get('http://localhost:8080/api/v1/inventory', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const reqRes = await axios.get('http://localhost:8080/api/v1/requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setInventory(invRes.data);
      setRequests(reqRes.data);

      const critical = reqRes.data.filter(r => r.urgency === 'Critical' && r.status === 'PENDING').length;
      
      setStats({
        totalRequests: reqRes.data.length,
        totalBloodUnits: invRes.data.filter(i => i.status === 'AVAILABLE').length,
        criticalAlerts: critical
      });

    } catch (e) {
      console.error('Failed to fetch admin data', e);
    }
  };

  // Process data for charts
  const bloodGroupCounts = inventory.reduce((acc, unit) => {
    if (unit.status === 'AVAILABLE') {
      acc[unit.bloodGroup] = (acc[unit.bloodGroup] || 0) + (unit.units || 1);
    }
    return acc;
  }, {});

  const pieData = Object.keys(bloodGroupCounts).map(key => ({
    name: key,
    value: bloodGroupCounts[key]
  }));

  // Process requests by status
  const requestStatusCounts = requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(requestStatusCounts).map(key => ({
    name: key,
    count: requestStatusCounts[key]
  }));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>Administrator Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card glass">
          <p>Total Blood Units Available</p>
          <div className="stat-value">{stats.totalBloodUnits}</div>
        </div>
        <div className="stat-card glass">
          <p>Total Blood Requests</p>
          <div className="stat-value">{stats.totalRequests}</div>
        </div>
        <div className="stat-card glass" style={{ borderLeft: stats.criticalAlerts > 0 ? '4px solid var(--danger)' : 'none' }}>
          <p>Critical Pending Alerts</p>
          <div className="stat-value" style={{ color: stats.criticalAlerts > 0 ? 'var(--danger)' : 'var(--success)' }}>
            {stats.criticalAlerts}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Available Blood by Group</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData.length > 0 ? pieData : [{ name: 'Empty', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Requests Status Overview</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData.length > 0 ? barData : [{ name: 'No Data', count: 0 }]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="var(--text-color)" />
                <YAxis stroke="var(--text-color)" />
                <RechartsTooltip contentStyle={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="glass" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Worker Management</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Manage your organization's workers. (This section would integrate with a user management API)</p>
        <button className="btn-secondary">Add New Worker</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
