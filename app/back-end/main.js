import express from "express";
import cors from "cors";
import {router as indexRouter} from "./routes/index.js";
import { synchronizeDatabase } from "./models/config.js";
import { Movie } from "./models/movies.js";
import { Collection } from "./models/collections.js";
import { Person } from "./models/people.js";

const PORT = 8080;

// definirea relatiilor
// Many-to-Many
Movie.belongsToMany(Collection, {through: "movie_collections"});
Collection.belongsToMany(Movie, {through: "movie_collections"});

// One-to-Many/Many-to-One
Person.hasMany(Collection);
Collection.belongsTo(Person);

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", indexRouter);

const server = app.listen(PORT, async () => {
	try {
		// apelăm metoda ce va sincroniza modelele definite în cadrul aplicației cu baza de date
		await synchronizeDatabase();
		console.log(`Server started on http://localhost:${PORT}`);
	} catch (err) {
		console.log("There was an error with the database connection");
		// daca apare o eroare in momentul sincronizarii bazei de date, vom opri aplicatia
		server.close();
	}
});