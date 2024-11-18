import express from "express";
import * as moviesController from "../controllers/movies.js";

const router = express.Router();

router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);

router.post("/", moviesController.createMovie);

export {router};