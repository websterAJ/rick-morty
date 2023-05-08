const db = require("../models");
const character = db.character;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
     if (!req.body.name || !req.body.image || !req.body.status || !req.body.origin || !req.body.species || !req.body.gender || !req.body.location) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const Newcharacter = {
        name: req.body.name,
        image: req.body.image,
        status: req.body.status,
        origin: req.body.origin,
        species: req.body.species,
        gender: req.body.gender,
        location: req.body.location
    };
    character.create(Newcharacter).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the character."
        });
    });
};
exports.findAll = (req, res) => {
    character.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving character."
        });
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    if (id != null) {
        character.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find character with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving character with id=" + id
            });
        });
    }else if(name != null) {
        character.findOne({where:{'name':name}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find character with name=${name}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving character with name=" + name
            });
        });
    }
};
exports.update = (req, res) => {
    const id = req.params.id;
    character.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "character was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update character with id=${id}. Maybe character was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating character with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    character.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "character was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete character with id=${id}. Maybe character was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete character with id=" + id
        });
    });
};
exports.deleteAll = (req, res) => {
    character.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} character were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all character."
        });
    });
};