import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../../assets/background.jfif';

const StudentsLogin = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [class_name, setClass_name] = useState('');
  const [nis, setNis] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login(name, password);

        if (response.data.msg === 'Login successful' && response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('student_name', response.data.user.name);
          navigate('/student/dashboard');
        } else {
          toast.error(response.data.msg);
        }
      } else {
        // const response = await axios.post('https://vxw7nsf9-5000.asse.devtunnels.ms/students', {
        const response = await axios.post('http://localhost:5000/students', {
          name,
          password,
          class_name,
          nis,
        });

        if (response.data.msg === 'Student Created!' && response.status === 201) {
          setName('');
          setClass_name('');
          setNis('');
          setPassword('');
          setIsLogin(true);
        }
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
      <span className="font-prata mb-2">{!isLogin ? 'Sign Up' : 'Login'}</span>

      <form onSubmit={handleLogin}>
        {/* Name */}
        <div>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Name" required autoComplete="off" />
        </div>

        {/* Class Name */}
        {!isLogin && (
          <div>
            <input type="text" id="class_name" value={class_name} onChange={(e) => setClass_name(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Class" required autoComplete="off" />
          </div>
        )}

        {/* NIS */}
        {!isLogin && (
          <div>
            <input type="text" id="nis" value={nis} onChange={(e) => setNis(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="NIS" required autoComplete="off" />
          </div>
        )}

        {/* Password */}
        <div>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-97 h-12 text-[18px] px-[8px] py-[16px] border-1 font-outfit" placeholder="Password" required autoComplete="off" />
        </div>

        <div className="flex justify-between w-97 text-sm mt-2 hover:cursor-pointer font-outfit">
          <span onClick={() => navigate('/admin/login')}>Admin Login</span>
          <span
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? 'Login Here' : 'Create account'}
          </span>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button className="w-34 py-[8px] bg-[#000] text-[#FFF] text-lg font-outfit hover:cursor-pointer">{!isLogin ? 'Sign Up' : 'Sign In'}</button>
        </div>
      </form>
    </div>
  );
};

export default StudentsLogin;
