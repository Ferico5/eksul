import Students from '../models/StudentsModel.js';
import bcrypt from 'bcryptjs';

export const createStudent = async (req, res) => {
  const { name, password, class_name, nis } = req.body;

  try {
    const { nis } = req.body;

    const existingNIS = await Students.findOne({
      where: { nis },
    });

    if (existingNIS) {
      return res.status(400).json({ msg: 'NIS already exists, try another!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Students.create({
      name,
      password: hashedPassword,
      class_name,
      nis,
    });

    res.status(201).json({ msg: 'Student Created!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error during student creation' }); // ← biar toast muncul juga saat server error
  }
};

// export const countUser = async (req, res) => {
//   try {
//     const count = await Registration.count({
//       where: {
//         role: 'user'
//       }
//     })
//     res.status(200).json({count})
//   } catch (error) {
//     console.log(error.message)
//   }
// }

export const getStudent = async (req, res) => {
  try {
    const response = await Students.findAll({
      where: {
        role: 'student',
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getStudentById = async (req, res) => {
  try {
    const response = await Students.findOne({
      where: {
        id_student: req.params.id_student,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
