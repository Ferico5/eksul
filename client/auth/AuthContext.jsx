/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (name, password, role = 'student') => {
    try {
      const endpoint = role === 'admin' ? 'https://vxw7nsf9-5000.asse.devtunnels.ms/admin/login' : 'https://vxw7nsf9-5000.asse.devtunnels.ms/login';

      const response = await axios.post(endpoint, { name, password });

      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        return response;
      }
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return { data: { msg: 'Server error' } };
    }
  };

  const logout = (navigate) => {
    const role = user.role;

    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (role === 'admin') {
      navigate('/admin/login');
    } else {
      navigate('/student/login');
    }
  };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
