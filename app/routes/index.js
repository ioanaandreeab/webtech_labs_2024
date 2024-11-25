import express from "express";
import {router as moviesRouter} from './movies.js';
import {router as collectionsRouter} from './collections.js';
import {router as peopleRouter} from './people.js';

const router = express.Router();

router.use("/movies", moviesRouter);
router.use("/collections", collectionsRouter);
router.use("/people", peopleRouter);

export {router};