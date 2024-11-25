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

export {
    getPeople,
    getPersonById,
    createPerson,
    updatePerson,
    removePerson
}