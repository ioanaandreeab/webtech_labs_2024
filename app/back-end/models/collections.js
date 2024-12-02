import { db } from "./config.js";
import { DataTypes } from "sequelize";

export const Collection = db.define("Collection", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	poster: {
		type: DataTypes.STRING
	}
});