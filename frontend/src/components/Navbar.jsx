import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">
        Ticketing Tool
      </Link>
      {user && (
        <button className="btn btn-outline-secondary" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
