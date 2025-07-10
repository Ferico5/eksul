import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [eksuls, setEksuls] = useState([]);
  const [selectedEksul, setSelectedEksul] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState('');
  const [presentMembers, setPresentMembers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    day: [],
    start_time: '',
    end_time: '',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newEksulData, setNewEksulData] = useState({
    name: '',
    day: [],
    start_time: '',
    end_time: '',
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchEksuls();
    }
  }, [user]);

  const fetchEksuls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/eksul');
      setEksuls(response.data.listEksul || []);
    } catch (error) {
      console.error('Failed to fetch extracurriculars:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this extracurricular?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/eksul/${id}`);
      setEksuls(eksuls.filter((e) => e.id_eksul !== id));
      alert('Deleted successfully');
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete extracurricular.');
    }
  };

  const handleOpenModal = (eksul) => {
    setSelectedEksul(eksul);
    setFormData({
      name: eksul.name,
      day: Array.isArray(eksul.day) ? eksul.day : [],
      start_time: eksul.start_time,
      end_time: eksul.end_time,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEksul(null);
    setFormData({ name: '', day: [], start_time: '', end_time: '' });
  };

  const handleOpenAttendanceModal = (eksul) => {
    setSelectedEksul(eksul);
    setAttendanceDate(new Date().toISOString().split('T')[0]); // hari ini
    setPresentMembers([]);
    setShowAttendanceModal(true);
  };

  const handleToggleAttendance = (name) => {
    setPresentMembers((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const handleSubmitAttendance = async () => {
    try {
      await axios.post('http://localhost:5000/attendance', {
        eksulId: selectedEksul.id_eksul,
        date: attendanceDate,
        present_members: presentMembers,
      });
      alert('Absensi berhasil disimpan!');
      setShowAttendanceModal(false);
    } catch (error) {
      console.error('Gagal simpan absensi:', error);
      alert('Gagal menyimpan absensi.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'day') {
      setFormData((prev) => ({
        ...prev,
        day: value.split(',').map((d) => d.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const { name, day, start_time, end_time } = formData;

    if (!name.trim() || day.length === 0 || !start_time || !end_time) {
      toast.error('All fields must be filled in!');
      return;
    }

    const start = new Date(`2023-01-01T${start_time}`);
    const end = new Date(`2023-01-01T${end_time}`);
    if (start >= end) {
      toast.error('Start time must be less than end time!');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/eksul/${selectedEksul.id_eksul}`, formData);
      toast.success('Extracurricular activity successfully updated!');
      handleCloseModal();
      fetchEksuls();
    } catch (error) {
      console.error('Failed to update extracurricular:', error);
      toast.error('Failed to update extracurricular activities. Please contact developer!');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6">
      <div className="flex justify-between items-center">
        <h1 className="mt-20 text-3xl font-bold mb-6 font-prata">Admin - Manage Extracurriculars</h1>
        <button onClick={() => setShowAddModal(true)} className="bg-indigo-600 text-white mt-13 px-4 py-2 rounded hover:bg-indigo-700 hover:cursor-pointer">
          + Add New
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {eksuls.map((eksul) => (
          <div key={eksul.id_eksul} className="bg-white shadow-lg rounded-xl p-6 border font-outfit">
            <h2 className="text-xl font-semibold text-[#1E293B] mb-2">{eksul.name}</h2>
            <div className="text-sm text-gray-600 mb-1">
              <strong>Days:</strong> {Array.isArray(eksul.day) ? eksul.day.join(', ') : eksul.day}
            </div>
            <div className="text-sm text-gray-600 mb-1">
              <strong>Time:</strong> {eksul.start_time} - {eksul.end_time}
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <strong>Members:</strong> {eksul.members?.length || 0} students
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/admin/attendance/${eksul.id_eksul}`)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 hover:cursor-pointer">
                Attendance
              </button>
              <button onClick={() => handleOpenAttendanceModal(eksul)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 hover:cursor-pointer">
                Absence
              </button>
              <button onClick={() => handleOpenModal(eksul)} className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 hover:cursor-pointer">
                Update
              </button>
              <button onClick={() => handleDelete(eksul.id_eksul)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 hover:cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Extracurricular</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" name="name" value={newEksulData.name} onChange={(e) => setNewEksulData((prev) => ({ ...prev, name: e.target.value }))} className="w-full border px-3 py-2 rounded mt-1" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Day (comma-separated)</label>
                <input
                  type="text"
                  name="day"
                  value={newEksulData.day.join(', ')}
                  onChange={(e) =>
                    setNewEksulData((prev) => ({
                      ...prev,
                      day: e.target.value.split(',').map((d) => d.trim()),
                    }))
                  }
                  className="w-full border px-3 py-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Start Time</label>
                <input type="time" name="start_time" value={newEksulData.start_time} onChange={(e) => setNewEksulData((prev) => ({ ...prev, start_time: e.target.value }))} className="w-full border px-3 py-2 rounded mt-1" required />
              </div>
              <div>
                <label className="block text-sm font-medium">End Time</label>
                <input type="time" name="end_time" value={newEksulData.end_time} onChange={(e) => setNewEksulData((prev) => ({ ...prev, end_time: e.target.value }))} className="w-full border px-3 py-2 rounded mt-1" required />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
                onClick={() => {
                  setShowAddModal(false);
                  setNewEksulData({ name: '', day: [], start_time: '', end_time: '' });
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
                onClick={async () => {
                  const { name, day, start_time, end_time } = newEksulData;

                  if (!name.trim() || day.length === 0 || !start_time || !end_time) {
                    toast.error('All fields must be filled in!');
                    return;
                  }

                  const start = new Date(`2023-01-01T${start_time}`);
                  const end = new Date(`2023-01-01T${end_time}`);
                  if (start >= end) {
                    toast.error('Start time must be less than end time!');
                    return;
                  }

                  try {
                    await axios.post('http://localhost:5000/eksul', newEksulData);
                    toast.success('Extracurricular activity successfully added!');
                    setShowAddModal(false);
                    setNewEksulData({ name: '', day: [], start_time: '', end_time: '' });
                    fetchEksuls();
                  } catch (error) {
                    console.error('Failed to add extracurricular:', error);
                    toast.error('Failed to add extracurricular activities. Please contact developer!');
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update */}
      {showModal && selectedEksul && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit {selectedEksul.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name (Read Only)</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium">Day (comma-separated)</label>
                <input type="text" name="day" value={formData.day.join(', ')} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Start Time</label>
                <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">End Time</label>
                <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full border px-3 py-2 rounded mt-1" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Absensi */}
      {showAttendanceModal && selectedEksul && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Absensi: {selectedEksul.name}</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium">Tanggal</label>
              <input type="date" value={attendanceDate} onChange={(e) => setAttendanceDate(e.target.value)} className="w-full border px-3 py-2 rounded mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Pilih Anggota Hadir:</label>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {(selectedEksul.members || []).map((member, index) => {
                  const name = typeof member === 'string' ? member : member.name;
                  return (
                    <label key={index} className="flex items-center space-x-2">
                      <input type="checkbox" checked={presentMembers.includes(name)} onChange={() => handleToggleAttendance(name)} />
                      <span>{name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer" onClick={() => setShowAttendanceModal(false)}>
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer" onClick={handleSubmitAttendance}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
