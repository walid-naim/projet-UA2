import database from "../config/connection.js";
import { DataTypes } from "sequelize";


 const OrderDetail = database.define('OrderDetail', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});
export default OrderDetail ;
