import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminAttendanceList = () => {
  const { id_eksul } = useParams(); // ambil dari URL
  const [attendanceList, setAttendanceList] = useState([]);
  const [eksulName, setEksulName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const [attendanceRes, eksulRes] = await Promise.all([axios.get(`https://vxw7nsf9-5000.asse.devtunnels.ms/attendance/${id_eksul}`), axios.get(`https://vxw7nsf9-5000.asse.devtunnels.ms/eksul/${id_eksul}`)]);
        setAttendanceList(attendanceRes.data.attendanceList);
        setEksulName(eksulRes.data.singleEksul.name);
      } catch (error) {
        console.error('Failed to retrieve attendance data:', error);
      }
    };

    fetchAttendance();
  }, [id_eksul]);

  return (
    <div className="flex flex-col px-6 mt-25 font-outfit">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4">
        <h1 className="text-3xl font-bold mb-2 lg:mb-6">Attendance History - {eksulName}</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 hover:cursor-pointer text-black px-4 py-2 rounded h-10 text-sm sm:text-base text-center flex items-center justify-center gap-2"
        >
          <span className="hidden md:inline">Return to</span> Extracurricular List
        </button>
      </div>

      {attendanceList.length === 0 ? (
        <p className="text-gray-500">There is no attendance data for this extracurricular activity yet.</p>
      ) : (
        <div className="space-y-6">
          {attendanceList.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-md">
              <h2 className="text-xl font-semibold mb-2">Date: {entry.date}</h2>
              <ul className="list-disc pl-6">
                {entry.present_members.map((member, idx) => (
                  <li key={idx}>{typeof member === 'string' ? member : member.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAttendanceList;
