import Attendance from '../models/AttendanceModel.js';

export const addAttendance = async (req, res) => {
  try {
    const { eksulId, date, present_members } = req.body;

    const existing = await Attendance.findOne({
      where: { eksulId, date },
    });

    if (existing) {
      existing.present_members = present_members;
      await existing.save();
      return res.status(200).json({ msg: 'Attendance updated!', attendance: existing });
    }

    // Kalau belum ada, buat baru
    const newAttendance = await Attendance.create({
      eksulId,
      date,
      present_members,
    });

    res.status(201).json({ msg: 'Attendance recorded!', attendance: newAttendance });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getAttendanceByEksul = async (req, res) => {
  try {
    const attendanceList = await Attendance.findAll({
      where: { eksulId: req.params.id_eksul },
    });

    res.status(200).json({ msg: 'Attendance retrieved!', attendanceList });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
