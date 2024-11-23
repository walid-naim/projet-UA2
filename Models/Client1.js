import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Client = database.define('Client', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, { timestamps: false });
export default Client ;
