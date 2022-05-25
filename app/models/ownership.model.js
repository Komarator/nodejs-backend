const sql = require("./db.js");

// constructor
const Ownership = function(ownership) {
    this.fk_user_id = ownership.fk_user_id;
    this.fk_animals_id = ownership.fk_animals_id;
    this.adoption_date = ownership.adoption_date;
    this.return_date = ownership.return_date;

};

Ownership.create = (newOwnership, result) => {
    sql.query("INSERT INTO users SET ?", newOwnership, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created ownership: ", { id: res.insertId, ...newOwnership });
        result(null, { id: res.insertId, ...newOwnership });
    });
};

Ownership.findById = (id, result) => {
    sql.query(`SELECT * FROM ownership WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found ownership: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

Ownership.getAll = (id, result) => {
    let query = "SELECT * FROM ownership";

    if (id) {
        query += ` WHERE title LIKE '%${id}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ownership: ", res);
        result(null, res);
    });
};


Ownership.updateById = (id, ownership, result) => {
    sql.query(
        "UPDATE ownership SET fk_user_id = ?, fk_animals_id = ?, adoption_date = ? , return_date = ? WHERE id = ?",
        [ownership.fk_user_id, ownership.fk_animals_id, ownership.adoption_date,ownership.return_date, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found ownership with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated ownership: ", { id: id, ...ownership });
            result(null, { id: id, ...ownership });
        }
    );
};

Ownership.remove = (id, result) => {
    sql.query("DELETE FROM ownership WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found ownership with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ownership with id: ", id);
        result(null, res);
    });
};

Ownership.removeAll = result => {
    sql.query("DELETE FROM ownership", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = Ownership;