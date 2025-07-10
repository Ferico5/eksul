import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const StudentsDashboard = () => {
  const [eksuls, setEksuls] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEksuls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/eksul');
        setEksuls(response.data.listEksul || []);
      } catch (error) {
        console.error('Failed to fetch extracurriculars:', error);
      }
    };

    fetchEksuls();
  }, []);

  if (!user || user.role !== 'student') {
    navigate('/student/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6">
      <h1 className="mt-20 text-3xl font-bold mb-6 font-prata">Extracurricular List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eksuls.map((eksul) => (
          <div key={eksul.id_eksul} onClick={() => navigate(`/student/eksul/${eksul.id_eksul}`)} className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl border font-outfit hover:border-indigo-500 hover:cursor-pointer">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-2">{eksul.name}</h2>
            <div className="text-sm text-gray-600 mb-1">
              <strong>Days:</strong> {Array.isArray(eksul.day) ? eksul.day.join(', ') : eksul.day}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              <strong>Time:</strong> {eksul.start_time} - {eksul.end_time}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Members:</strong> {eksul.members?.length || 0} students
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsDashboard;
