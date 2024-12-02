import {Person} from "../models/people.js";

const getPeople = async (req, res) => {
    const people = await Person.findAll();
    res.status(200).send({records: people});
}

const getPersonById = async(req, res) => {
	try {
		const person = await Person.findByPk(req.params.id);
		if (person) {
			res.status(200).send({person: person});
		} else {
			res.status(404).send({message: "person not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const createPerson = async (req, res) => {
	const person = req.body;
	await Person.create(person);

	res.status(201).send({message: "Person was created"});
};

const updatePerson = async (req, res) => {
	try {
		const person = await Person.findByPk(req.params.id);
		if (person) {
			const updatedPerson = await person.update(req.body);
			res.status(200).send({person: updatedPerson});
		} else {
			res.status(404).send({message: "person not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const removePerson = async (req, res) => {
	try {
		const person = await Person.findByPk(req.params.id);
		if (person) {
			await person.destroy();
			res.status(200).send({message: "deleted person"});
		} else {
			res.status(404).send({message:"person not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

const addCollectionToPerson = async (req, res) => {
	try {
		const person = await Person.findByPk(req.params.personId);
        const collection = await Collection.findByPk(req.params.collectionId);
        if (person && collection) {
            person.addCollection(collection);
            await person.save();
            res.status(200).json({message: "added collection to person", collection:collection, person: person});
        } else {
            res.status(404).json({message: "collection/person not found."});
        }
	} catch(err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const getCollectionsForPerson = async (req, res) => {
	try {
		const person = await Person.findByPk(req.params.id);
        if (person) {
            const collections = await person.getCollections();
            res.status(200).json({collections: collections});
        } else {
            res.status(404).json({message: "person not found."});
        }
	} catch(err) {
		res.status(500).send({message: "server error", err: err});
	}
};

export {
    getPeople,
    getPersonById,
    createPerson,
    updatePerson,
    removePerson,
	getCollectionsForPerson,
	addCollectionToPerson
}