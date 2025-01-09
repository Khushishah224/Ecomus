import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import api, { setAuthToken } from '../../api';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address', {
        position: 'bottom-center',
        style: {
          background: '#fff1e6',
          color: '#e74c3c',
          borderBottom: '3px solid #e74c3c'
        }
      });
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long', {
        position: 'bottom-center',
        style: {
          background: '#fff1e6',
          color: '#e74c3c',
          borderBottom: '3px solid #e74c3c'
        }
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Authenticating...', {
      position: 'bottom-center'
    });

    try {
      const response = await api.post('/api/admin/login', formData);
      const { token } = response.data;
  
      setAuthToken(token);
      toast.dismiss(loadingToast);
      toast.success('Login successful! Redirecting to dashboard...', {
        position: 'bottom-center',
        duration: 2000,
        style: {
          background: '#fff1e6',
          color: '#2ecc71',
          borderBottom: '3px solid #2ecc71'
        }
      });
      
      
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000);
      
      

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.', {
        position: 'bottom-center',
        style: {
          background: '#fff1e6',
          color: '#e74c3c',
          borderBottom: '3px solid #e74c3c'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-login-container">
      <Toaster />
      <div className="admin-brand-section">
        <h1 className="brand-title">ecomus</h1>
        <p className="brand-tagline">Admin Management Portal</p>
      </div>
      
      <div className="admin-form-container">
        <div className="admin-login-header">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Please enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <div className="admin-input-group">
              <span className="admin-input-icon">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={formData.email}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <div className="admin-input-group">
              <span className="admin-input-icon">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
          </div>

          <div className="admin-forgot-password">
            <a href="/admin/forgot-password">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className={`admin-submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;