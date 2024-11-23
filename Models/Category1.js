import database from "../config/connection.js";
import { DataTypes } from "sequelize";

const Category = database.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
} 
,{timestamps: false}
);

export default Category;