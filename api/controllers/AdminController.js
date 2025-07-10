import Admin from '../models/AdminModel.js';
import bcrypt from 'bcryptjs';

export const createAdmin = async (req, res) => {
  const { name, password, nia } = req.body;

  try {
    const { nia } = req.body;

    const existingNIA = await Admin.findOne({
      where: { nia },
    });

    if (existingNIA) {
      return res.status(400).json({ msg: 'NIA already exists, try another!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      name,
      password: hashedPassword,
      nia,
    });

    res.status(201).json({ msg: 'Admin Created!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error during admin creation' });
  }
};