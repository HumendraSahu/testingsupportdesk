import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ to, icon, label, onClick }) => (
  <li className="nav-item" onClick={onClick}>
    <NavLink className="nav-link d-flex align-items-center" to={to}>
      <i className={`bi bi-${icon} me-2`}></i>
      <span>{label}</span>
    </NavLink>
  </li>
);

export default SidebarItem;
