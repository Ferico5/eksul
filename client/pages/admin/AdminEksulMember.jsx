import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

const AdminEksulMember = () => {
  const { id_eksul } = useParams();
  const navigate = useNavigate();
  const [eksul, setEksul] = useState(null);
  const [members, setMembers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEksul = async () => {
      try {
        const response = await axios.get(`https://vxw7nsf9-5000.asse.devtunnels.ms/eksul/${id_eksul}`);
        setEksul(response.data.singleEksul);
        setMembers(response.data.members);
      } catch (error) {
        console.error('Failed to fetch eksul data:', error);
      }
    };

    fetchEksul();
  }, [id_eksul]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="p-6 mt-20 font-outfit">
      <h1 className="text-3xl font-bold mb-4">Members of {eksul?.name}</h1>
      <button onClick={() => navigate(-1)} className="mb-4 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer text-black px-4 py-2 rounded">
        ⬅ Back
      </button>

      {members.length === 0 ? (
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

export default AdminEksulMember;
