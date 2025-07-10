import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../../assets/background.jfif';

const AdminLogin = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(name, password, 'admin');

      if (response.data.msg === 'Login successful' && response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin_name', response.data.user.name);
        navigate('/admin/dashboard');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        console.error(error);
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-[33px] h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <span className="font-prata mb-2">Admin Login</span>

      <form onSubmit={handleLogin}>
        {/* Name */}
        <div>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Name" required autoComplete="off" />
        </div>

        {/* Password */}
        <div>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Password" required autoComplete="off" />
        </div>

        <div className="flex w-97 text-sm mt-2 hover:cursor-pointer font-outfit">
          <span onClick={() => navigate('/student/login')}>Student Login</span>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button className="w-34 py-[8px] bg-[#000] text-[#FFF] text-lg font-outfit hover:cursor-pointer">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
