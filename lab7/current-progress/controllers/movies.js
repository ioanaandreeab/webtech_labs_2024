import { movies } from "../models/movies.js";

const getMovies = (req, res) => {
    res.send({ records: movies });
};

const getMovieById = (req, res) => {
    const id = req.params.id;
    const identifiedMovie = movies[id];

    if(identifiedMovie) {
        res.send({movie: identifiedMovie});
    } else {
        res.status(404).send({ message: "Movie not found" });
    }
};

const createMovie = (req, res) => {
    const newMovie = req.body.title;

    // dacă filmul nu există deja, îl adăugăm
    if(!movies.includes(newMovie)) {
        movies.push(newMovie);
    }

    res.status(201).send({result: "Movie was created"});
};

export {
    getMovies,
    getMovieById,
    createMovie
}