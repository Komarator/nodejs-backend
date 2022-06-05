const sql = require("./db.js");

// constructor
const Animal = function(animal) {
    this.animal_breed = animal.animal_breed;
    this.animal_name = animal.animal_name;
    this.animal_age = animal.animal_age;
    this.date_of_registration = animal.date_of_registration;
    this.release_date = animal.release_date;
    this.date_of_death = animal.date_of_death;
    this.description = animal.description;
    this.image = animal.image;

};

Animal.create = (newAnimal, result) => {
    sql.query("INSERT INTO animals SET ?", newAnimal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        //console.log("created animal: ", { id: res.insertId, ...newAnimal });
        result(null, { id: res.insertId, ...newAnimal });
    });
};

Animal.findById = (id, result) => {
    sql.query(`SELECT * FROM animals WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log("found animal: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

Animal.getAll = (animal_name, result) => {
    let query = "SELECT * FROM animals";

    if (animal_name) {
        query += ` WHERE title LIKE '%${animal_name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("animals: ", res);
        result(null, res);
    });
};


Animal.updateById = (id, animal, result) => {
    sql.query(
        "UPDATE animals SET animal_breed = ?, animal_name = ?, animal_age = ? , date_of_registration = ?, release_date = ?, date_of_death = ?, image = ? WHERE id = ?",
        [animal.animal_breed, animal.animal_name, animal.animal_age,animal.date_of_registration,animal.release_date,animal.date_of_death,animal.image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found animal with the id
                result({ kind: "not_found" }, null);
                return;
            }

           // console.log("updated animal: ", { id: id, ...animal });
            result(null, { id: id, ...animal });
        }
    );
};

Animal.remove = (id, result) => {
    sql.query("DELETE FROM animals WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found animal with the id
            result({ kind: "not_found" }, null);
            return;
        }

       // console.log("deleted animal with id: ", id);
        result(null, res);
    });
};

Animal.removeAll = result => {
    sql.query("DELETE FROM animals", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = Animal;
