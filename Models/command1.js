import database from "../config/connection.js";
import { DataTypes } from "sequelize";

 const Order = database.define('Order', {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
export default Order ;

