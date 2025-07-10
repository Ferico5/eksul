import Students from '../models/StudentsModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'jwt-secret';

export const getStudentLogin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const student = await Students.findOne({
      where: { name },
    });

    if (!student) {
      return res.status(400).json({ msg: 'Invalid name or password' });
    }

    // Compare hash password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid name or password' });
    }

    // Generate token
    const token = jwt.sign(
      {
        id_student: student.id_student,
        name: student.name,
        role: student.role,
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id_student: student.id_student,
        name: student.name,
        role: student.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
