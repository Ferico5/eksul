import { DataTypes, Model } from 'sequelize';
import db from '../config/Database.js';

class Students extends Model {}

Students.init(
  {
    id_student: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'class',
    },
    nis: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'student',
    },
  },
  {
    sequelize: db,
    modelName: 'Students',
    tableName: 'students',
    freezeTableName: true,
  }
);

export default Students;
