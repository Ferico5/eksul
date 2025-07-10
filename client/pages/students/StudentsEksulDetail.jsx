import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

const EksulDetail = () => {
  const { id } = useParams();
  const [eksul, setEksul] = useState(null);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentUserName = localStorage.getItem('student_name');
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const fetchEksul = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/eksul/${id}`);
        setEksul(response.data.singleEksul);
        setMembers(response.data.members);

        const memberNames = response.data.members.map((m) => m.name);
        setHasJoined(memberNames.includes(currentUserName));
      } catch (error) {
        console.error('Error fetching eksul details:', error);
      }
    };

    fetchEksul();
  }, [id]);

  const handleJoinEksul = async () => {
    const confirmJoin = window.confirm('Are you sure you want to join this extracurricular activity?');
    if (!confirmJoin) return;

    try {
      const currentUserName = localStorage.getItem('student_name');

      if (!currentUserName) {
        alert('Student name not found. Please log in again.');
        return;
      }

      const existingNames = Array.isArray(eksul.members) ? eksul.members.map((m) => (typeof m === 'string' ? m : m.name)).filter(Boolean) : [];

      const updatedMembers = Array.from(new Set([...existingNames, currentUserName]));

      await axios.put(`http://localhost:5000/eksul/${id}`, {
        members: updatedMembers,
      });

      alert('Successfully joined the extracurricular!');
      location.reload();
    } catch (error) {
      console.error('Error joining extracurricular:', error);
      alert('Failed to join extracurricular activities. Please contact admin!');
    }
  };

  const handleLeaveEksul = async () => {
    const confirmLeave = window.confirm('Are you sure you want to leave this extracurricular activity?');
    if (!confirmLeave) return;

    try {
      const existingNames = Array.isArray(eksul.members) ? eksul.members.map((m) => (typeof m === 'string' ? m : m.name)).filter(Boolean) : [];

      const updatedMembers = existingNames.filter((name) => name !== currentUserName);

      await axios.put(`http://localhost:5000/eksul/${id}`, {
        members: updatedMembers,
      });

      alert('You have left the extracurricular.');
      location.reload();
    } catch (error) {
      console.error('Error leaving extracurricular:', error);
      alert('Failed to leave extracurricular. Please contact admin!');
    }
  };

  if (!user || user.role !== 'student') {
    navigate('/student/login');
    return null;
  }

  if (!eksul) {
    return <div className="p-6 mt-20 text-center text-xl font-outfit">Loading extracurricular details...</div>;
  }

  return (
    <div className="p-6 mt-20 font-outfit">
      <h1 className="text-3xl font-bold mb-4">{eksul.name}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Days:</strong> {Array.isArray(eksul.day) ? eksul.day.join(', ') : eksul.day}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Time:</strong> {eksul.start_time} - {eksul.end_time}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Coach:</strong> {eksul.coach}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
        <button onClick={() => navigate('/student/dashboard')} className="bg-gray-300 hover:bg-gray-400 hover:cursor-pointer text-black px-4 py-2 rounded">
          Return to Extracurricular List
        </button>
        {currentUserName &&
          (hasJoined ? (
            <button onClick={handleLeaveEksul} className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-4 py-2 rounded">
              Leave Extracurricular Activity
            </button>
          ) : (
            <button onClick={handleJoinEksul} className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded">
              Join Extracurricular Activity
            </button>
          ))}
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Members</h2>
      {eksul.members.length === 0 ? (
        <p className="text-gray-500">No members yet.</p>
      ) : (
        <table className="min-w-full border mt-2 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Class</th>
              <th className="border px-4 py-2 text-left">NIS</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">{member.class_name}</td>
                <td className="border px-4 py-2">{member.nis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EksulDetail;
