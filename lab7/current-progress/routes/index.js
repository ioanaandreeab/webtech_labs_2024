import express from "express";
import {router as moviesRouter} from './movies.js';

const router = express.Router();

router.use("/movies", moviesRouter);

export {router};