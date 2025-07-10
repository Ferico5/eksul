import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import logo from '../assets/logo.jfif';

const Header = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-[#1E1E2E] text-white flex justify-between items-center px-10 py-2 shadow-lg fixed w-full top-0">
      {/* Logo */}
      <img src={logo} alt="icon" className="w-15" />

      <div className="flex items-center">
        {/* Nama User */}
        {token && user && <p className="font-medium mr-10">{user?.name}</p>}
        {token && user && (
          <button onClick={() => logout(navigate)} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 hover:cursor-pointer">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
