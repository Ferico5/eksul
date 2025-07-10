import { DataTypes, Model } from 'sequelize';
import db from '../config/Database.js';

class Admin extends Model {}

Admin.init(
  {
    id_admin: {
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
    nia: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin',
    },
  },
  {
    sequelize: db,
    modelName: 'Admin',
    tableName: 'admin',
    freezeTableName: true,
  }
);

export default Admin;
