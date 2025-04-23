import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import authService from './services/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard onLogout={() => setIsAuthenticated(false)} />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 