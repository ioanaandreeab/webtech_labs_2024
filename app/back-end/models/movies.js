// importarea bazei de date definite in fisierul config.js
import { db } from "./config.js";
// importarea tipurilor de date suportate de sequelize
import { DataTypes } from "sequelize";

// definirea unei tabele noi cu numele Movie
export const Movie = db.define("Movie", {
	id: {
		// tipul unui camp
		type: DataTypes.INTEGER,
		// cheie primara
		primaryKey: true,
		// autoincrement
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING,
		// constrangere de camp nenul
		allowNull: false
	},
	year: {
		type: DataTypes.INTEGER,
		allowNull: false,
		// validarea ca valoarea minima ce poate fi stocata sa fie mai mare de 1900
		validate: {
			min: 1900
		}
	},
	director: {
		type: DataTypes.STRING,
		allowNull: false
	},
	genre: {
		type: DataTypes.STRING
	},
	synopsis: {
		// utilizarea unui tip de data ce permite inserarea unui text de mari dimensiuni
		type: DataTypes.TEXT
	},
	duration: {
		// utilizarea unui tip de data eficient, in concordanta cu plaja de valori ale campului
		type: DataTypes.TINYINT
	},
	poster: {
		type: DataTypes.STRING
	}
}, 
{
	indexes: [
		{
			// definirea unei constrangeri de unicitate pe baza tripletei titlu, an, regizor
			unique: true,
			fields: ['title', 'year', 'director']
		}
	]
});