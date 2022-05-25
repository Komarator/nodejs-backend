const Ownership = require("../models/ownership.model.js");

// Create and Save a new Ownership
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Ownership
    const ownership = new Ownership({
        fk_user_id: req.body.fk_user_id,
        fk_animals_id: req.body.fk_animals_id,
        adoption_date: req.body.adoption_date,
        return_date: req.body.return_date
    });

    // Save Ownership in the database
    Ownership.create(ownership, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Ownership from the database (with condition).
exports.findAll = (req, res) => {
    const id = req.query.id;
    Ownership.getAll(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        else res.send(data);
    });
};

// Find a single Ownership by Id
exports.findOne = (req, res) => {
    Ownership.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Ownership with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Ownership with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};


// Update a Ownership identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Ownership.updateById(
        req.params.id,
        new Ownership(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Ownership with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Ownership with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Ownership with the specified id in the request
exports.delete = (req, res) => {
    Ownership.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Ownership with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Ownership with id " + req.params.id
                });
            }
        } else res.send({ message: `Ownership was deleted successfully!` });
    });
};

// Delete all Ownership from the database.
exports.deleteAll = (req, res) => {
    Ownership.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Ownerships."
            });
        else res.send({ message: `All Ownerships were deleted successfully!` });
    });
};