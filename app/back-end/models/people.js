import {db} from "./config.js";
import {DataTypes} from "sequelize";

export const Person = db.define("Person", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING
	},
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true
    }
},
{
	indexes: [
		{
			unique: true,
			fields: ['email']
		}
	]
});