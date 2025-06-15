import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../../services/authService';
import { setUser } from '../../store/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    company: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { firstName, lastName, workEmail, company, phone, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await registerAdmin({
        firstName,
        lastName,
        email: workEmail,
        company,
        phone,
        password,
      });
      dispatch(setUser(user));
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Admin Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={lastName}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Work Email</label>
          <input
            type="email"
            className="form-control"
            name="workEmail"
            value={workEmail}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone (optional)</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={phone}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <div className="mt-3 text-center">
          <a href="/login">Back to Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
