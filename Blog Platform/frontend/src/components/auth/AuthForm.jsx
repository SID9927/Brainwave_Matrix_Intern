import React from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({ 
  formType, 
  formData, 
  setFormData, 
  onSubmit, 
  error 
}) => {
  const isLogin = formType === 'login';

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={onSubmit} className="auth-form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your name"
              required={!isLogin}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Enter your password"
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm your password"
              required={!isLogin}
            />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Register'}
        </button>

        <div className="auth-switch">
          {isLogin ? (
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          ) : (
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;