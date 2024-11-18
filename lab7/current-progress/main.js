import express from "express";
import {router as indexRouter} from "./routes/index.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));