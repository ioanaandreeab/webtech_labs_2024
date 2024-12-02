import express from 'express';
import * as personController from "../controllers/people.js";

export const router = express.Router();

router.get("/", personController.getPeople);
router.get("/:id", personController.getPersonById);

router.post("/", personController.createPerson);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.removePerson);

// relationship related routes
router.get("/:id/collections", personController.getCollectionsForPerson);
router.post("/:personId/collections/:collectionId", personController.addCollectionToPerson);