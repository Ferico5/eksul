import Admin from '../models/AdminModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'jwt-secret';

export const getAdminLogin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await Admin.findOne({
      where: { name },
    });

    if (!admin) {
      return res.status(400).json({ msg: 'Invalid name or password' });
    }

    // // Compare hash password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid name or password' });
    }

    // Generate token
    const token = jwt.sign(
      {
        id_admin: admin.id_admin,
        name: admin.name,
        role: admin.role,
      },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id_admin: admin.id_admin,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
