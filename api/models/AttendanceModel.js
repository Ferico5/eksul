import { DataTypes, Model } from 'sequelize';
import db from '../config/Database.js';
import Eksul from './EksulModel.js';

class Attendance extends Model {}

Attendance.init(
  {
    id_attendance: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eksulId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'eksul',
        key: 'id_eksul',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    present_members: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('present_members');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('present_members', JSON.stringify(value));
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Attendance',
    tableName: 'attendance',
    freezeTableName: true,
  }
);

Eksul.hasMany(Attendance, { foreignKey: 'eksulId' });
Attendance.belongsTo(Eksul, { foreignKey: 'eksulId' });

export default Attendance;
