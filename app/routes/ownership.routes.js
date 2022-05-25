module.exports = app => {
    const ownership = require("../controllers/ownership.controller.js");

    const router = require("express").Router();

    // Create a new User
    router.post("/", ownership.create);

    // Retrieve all Users
    router.get("/", ownership.findAll);

    // Retrieve a single User with id
    router.get("/:id", ownership.findOne);

    // Update a User with id
    router.put("/:id", ownership.update);

    // Delete a User with id
    router.delete("/:id", ownership.delete);

    // Delete all Users
    router.delete("/", ownership.deleteAll);

    app.use('/api/ownership', router);
};