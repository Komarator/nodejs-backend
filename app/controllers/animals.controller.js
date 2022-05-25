const Animal = require("../models/animals.model.js");

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Animal
    const animal = new Animal({
        animal_breed: req.body.animal_breed,
        animal_name: req.body.animal_name,
        animal_age: req.body.animal_age,
        date_of_registration: req.body.date_of_registration,
        release_date: req.body.release_date,
        date_of_death: req.body.date_of_death
    });

    // Save Animal in the database
    Animal.create(animal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Animal from the database (with condition).
exports.findAll = (req, res) => {
    const animal_name = req.query.animal_name;

    Animal.getAll(animal_name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        else res.send(data);
    });
};

// Find a single Animal by Id
exports.findOne = (req, res) => {
    Animal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Animal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Animal with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


// Update a Animal identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Animal.updateById(
        req.params.id,
        new Animal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Animal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Animal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
    Animal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Animal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Animal with id " + req.params.id
                });
            }
        } else res.send({ message: `Animal was deleted successfully!` });
    });
};

// Delete all Animal from the database.
exports.deleteAll = (req, res) => {
    Animal.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all animals."
            });
        else res.send({ message: `All Animals were deleted successfully!` });
    });
};