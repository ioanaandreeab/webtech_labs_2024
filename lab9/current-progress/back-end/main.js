import express from "express";
import cors from "cors";
import {router as indexRouter} from "./routes/index.js";
import { synchronizeDatabase } from "./models/config.js";

const PORT = 8080;

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