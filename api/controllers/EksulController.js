import Eksul from '../models/EksulModel.js';
import Students from '../models/StudentsModel.js';

export const addEksul = async (req, res) => {
  try {
    const { name, day, start_time, end_time, members, coach } = req.body;

    await Eksul.create({
      name,
      day,
      start_time,
      end_time,
      members,
      coach,
    });

    res.status(201).json({ msg: 'Eksul added!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const removeEksul = async (req, res) => {
  try {
    const eksul = await Eksul.findOne({
      where: { id_eksul: req.params.id_eksul },
    });

    if (!eksul) {
      return res.status(404).json({ msg: 'Eksul not found!' });
    }

    await eksul.destroy();

    res.status(200).json({ msg: 'Eksul removed!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const listEksul = async (req, res) => {
  try {
    const listEksul = await Eksul.findAll();
    res.status(200).json({ msg: 'Successful getting list eksul', listEksul });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const singleEksul = async (req, res) => {
  try {
    const singleEksul = await Eksul.findByPk(req.params.id_eksul);

    if (!singleEksul) {
      return res.status(404).json({ msg: 'Eksul not found!' });
    }

    let memberNames = [];
    if (singleEksul.members && typeof singleEksul.members === 'string') {
      memberNames = JSON.parse(singleEksul.members);
    } else if (Array.isArray(singleEksul.members)) {
      memberNames = singleEksul.members;
    }

    const membersDetail = await Students.findAll({
      where: {
        name: memberNames,
      },
      attributes: ['id_student', 'name', 'class_name', 'nis'],
    });

    res.status(200).json({
      msg: 'Successfully fetched ekskul',
      singleEksul,
      members: membersDetail,
    });
  } catch (error) {
    console.error('❌ singleEksul error:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateEksul = async (req, res) => {
  try {
    const eksul = await Eksul.findOne({
      where: { id_eksul: req.params.id_eksul },
    });

    if (!eksul) {
      return res.status(404).json({ msg: 'Eksul not found!' });
    }

    const updatedFields = {};
    const allowedFields = ['name', 'day', 'start_time', 'end_time', 'members', 'coach'];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedFields[field] = req.body[field];
      }
    }

    await eksul.update(updatedFields);

    res.status(200).json({ msg: 'Eksul updated!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
