import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Transaction = database.define("Transaction", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  description: {
    type: DataTypes.STRING, // Optional field
    allowNull: true,
  },
  paymentMethodId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Transaction;
