import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Droplet, ClipboardList, MapPin } from 'lucide-react';

const Sidebar = () => {
  const role = localStorage.getItem('role');

  return (
    <div className="sidebar glass">
      {role === 'ROLE_ADMIN' && (
        <>
          <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
        </>
      )}

      {role === 'ROLE_WORKER' && (
        <>
          <NavLink to="/worker" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Droplet size={20} /> Inventory
          </NavLink>
        </>
      )}

      {role === 'ROLE_USER' && (
        <>
          <NavLink to="/user" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <ClipboardList size={20} /> My Dashboard
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
