import database from "../config/connection.js";
import { DataTypes } from "sequelize";


  const Employee = database.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  hireDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default Employee ;