const db = require("../models");
const Character = db.character;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.idUser && !req.body.idCharacter) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Character
    const Character = {
        name:req.body.name,
        status:req.body.status,
        species:req.body.species,
        gender:req.body.gender,
        image:req.body.image,
        org_name:req.body.org_name,
        org_url:req.body.org_url
    };
    // Save Character in the database
    Character.create(Character).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Character."
        });
    });
}


exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    Character.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Character."
        });
    });
};
// Find a single Usuario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    if (id != null) {
        Character.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Character with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Character with id=" + id
            });
        });
    }else if(email != null) {
        Character.findOne({where:{'email':email}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Character with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Character with id=" + id
            });
        });
    }
};
exports.update = (req, res) => {
    const id = req.params.id;
    Character.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num === 1) {
            res.send({
            message: "Character was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Character with id=${id}. Maybe Character was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Character with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Character.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Character was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Character with id=${id}. Maybe Character was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Character with id=" + id
        });
    });
};
exports.deleteAll = (req, res) => {
    Character.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Character were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Character."
        });
    });
};