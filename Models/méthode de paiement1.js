import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const PaymentMethod = database.define("PaymentMethod", {
  type: {
    type: DataTypes.STRING,
    allowNull: false, // Ensures `type` cannot be null
  },
  description: {
    type: DataTypes.STRING,
  },
});

export default PaymentMethod ;
