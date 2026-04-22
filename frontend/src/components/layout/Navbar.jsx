import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Activity } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar glass">
      <div className="nav-brand">
        <Activity color="var(--primary)" size={28} />
        <span>BloodBank</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span>Welcome, <strong style={{ color: 'var(--primary)' }}>{username}</strong></span>
        <button className="btn-secondary" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 16px' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
