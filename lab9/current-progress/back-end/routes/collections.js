import express from "express";
import * as collectionsController from "../controllers/collections.js";

const router = express.Router();

router.get("/", collectionsController.getCollections);
router.get("/:id", collectionsController.getCollectionById);

router.post("/", collectionsController.createCollection);

router.put("/:id", collectionsController.updateCollection);
router.delete("/:id", collectionsController.removeCollection);

// relationship related routes
router.get("/:id/movies", collectionsController.getMoviesForCollection);
router.post("/:collectionId/movies/:movieId", collectionsController.addMovieToCollection);

export {router};