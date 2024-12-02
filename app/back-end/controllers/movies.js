import { movies } from "../helpers/movies.js";
import {Movie} from "../models/movies.js";

const getMovies = async (req, res) => {
	const movies = await Movie.findAll();
	res.status(200).send({movies});
}

const getMovieById = async(req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			res.status(200).send({movie: movie});
		} else {
			res.status(404).send({message: "movie not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const createMovie = async (req, res) => {
	//  campurile existente in interiorul parametrului primit trebuie sa aiba acelasi nume precum campurile din tabela
	//  altfel, Sequelize le va ignora si va incerca sa introduca doar acele field-uri pentru care poate sa asigure identitatea
	const movie = req.body;
	await Movie.create(movie);

	res.status(201).send({message: "Movie was created"});
};

const updateMovie = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			const updatedMovie = await movie.update(req.body);
			res.status(200).send({movie: updatedMovie});
		} else {
			res.status(404).send({message: "movie not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const removeMovie = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			await movie.destroy();
			res.status(200).send({message: "deleted movie"});
		} else {
			res.status(404).send({message:"movie not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

const initMovies = async (req, res) => {
	try {
		const mockMovies = [...movies];
		for (let i = 0; i < mockMovies.length; i++) {
			await Movie.create(mockMovies[i]);
		}
		res.status(200).send({message: "movies table initialized with mock information"});
	} catch (err) {
		res.status(500).send({message: "server error", err:err});
	}
}

export {
	getMovies,
	getMovieById,
	createMovie,
	updateMovie,
	removeMovie,
	initMovies
};