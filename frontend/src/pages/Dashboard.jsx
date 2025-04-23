import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/auth';

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
        if (err.response?.status === 401) {
          authService.logout();
          onLogout();
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate, onLogout]);

  const handleLogout = () => {
    authService.logout();
    onLogout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <div className="profile">
        <h3>Profile</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard; 