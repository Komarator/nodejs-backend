const animals = require("../controllers/animals.controller.js");
module.exports = app => {
    const animals = require("../controllers/animals.controller.js");

    const router = require("express").Router();

    // Create a new Animal
    router.post("/", animals.uploadImage,animals.create);

    // Retrieve all Animal
    router.get("/",animals.findAll);

    // Retrieve a single Animal with id
    router.get("/:id", animals.findOne);

    // Update a Animal with id
    router.put("/:id",animals.uploadImage, animals.update);

    // Delete a Animal with id
    router.delete("/:id", animals.delete);

    // Delete all Animal
    router.delete("/", animals.deleteAll);

    app.use('/api/animals', router);
};
