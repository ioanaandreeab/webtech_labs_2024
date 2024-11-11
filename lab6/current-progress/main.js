import express from "express";
import random from "random";
import { movies } from "./movies.js";

const PORT = 8080;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ records: movies });
});

app.get("/random", (req, res) => {
    const randomIndex = random.int(0, movies.length - 1);
    res.send({ movie: movies[randomIndex] });
});

app.get("/search", (req, res) => {
    const requestedTitle = req.query.title;
    const identifiedMovie = movies.find(movie => movie.includes(requestedTitle));

    if (identifiedMovie) {
        res.send({ movie: identifiedMovie });
    } else {
        res.status(404).send({ message: "Movie not found" });
    }
});

app.get("/:id", (req, res) => {
    const id = req.params.id;
    const identifiedMovie = movies[id];

    if(identifiedMovie) {
        res.send({movie: identifiedMovie});
    } else {
        res.status(404).send({ message: "Movie not found" });
    }
});

app.post("/", (req, res) => {
    const newMovie = req.body.title;

    // dacă filmul nu există deja, îl adăugăm
    if(!movies.includes(newMovie)) {
        movies.push(newMovie);
    }

    res.status(201).send({result: "Movie was created"});
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));