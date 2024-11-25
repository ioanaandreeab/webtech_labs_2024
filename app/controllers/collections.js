import { Collection } from "../models/collections.js";

const getCollections = async (req, res) => {
	const collections = await Collection.findAll();
	res.status(200).send({collections});
}

const getCollectionById = async(req, res) => {
	try {
		const collection = await Collection.findByPk(req.params.id);
		if (collection) {
			res.status(200).send({collection});
		} else {
			res.status(404).send({message: "collection not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const createCollection = async (req, res) => {
	const collection = req.body;
	await Collection.create(collection);

	res.status(201).send({message: "Collection was created"});
};

const updateCollection = async (req, res) => {
	try {
		const collection = await Collection.findByPk(req.params.id);
		if (collection) {
			const updatedCollection = await collection.update(req.body);
			res.status(200).send({collection: updatedCollection});
		} else {
			res.status(404).send({message: "collection not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const removeCollection = async (req, res) => {
	try {
		const collection = await Collection.findByPk(req.params.id);
		if (collection) {
			await collection.destroy();
			res.status(200).send({message: "deleted collection"});
		} else {
			res.status(404).send({message:"collection not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

export {
	getCollections,
	getCollectionById,
	createCollection,
	updateCollection,
	removeCollection
};