import express from "express";
import * as moviesController from "../controllers/movies.js";

const router = express.Router();

router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);

router.post("/", moviesController.createMovie);

router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.removeMovie);

// special route to initialize db with data
// testing purposes ONLY, an app should NOT expose such a route
router.post("/init", moviesController.initMovies);

export {router};