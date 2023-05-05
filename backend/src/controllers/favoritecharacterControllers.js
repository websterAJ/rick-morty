const db = require("../models");
const Favoritecharacter = db.favoritecharacter;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.idUser && !req.body.idCharacter) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Favoritecharacter
    const Favoritecharacter = {
        id_user: req.body.idUser,
        id_character: req.body.idCharacter
    };
    // Save Favoritecharacter in the database
    Favoritecharacter.create(Favoritecharacter).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Favoritecharacter."
        });
    });
}


exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    Favoritecharacter.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Favoritecharacter."
        });
    });
};
// Find a single Usuario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    if (id != null) {
        Favoritecharacter.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Favoritecharacter with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Favoritecharacter with id=" + id
            });
        });
    }else if(email != null) {
        Favoritecharacter.findOne({where:{'email':email}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Favoritecharacter with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Favoritecharacter with id=" + id
            });
        });
    }
};
exports.update = (req, res) => {
    const id = req.params.id;
    Favoritecharacter.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num === 1) {
            res.send({
            message: "Favoritecharacter was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Favoritecharacter with id=${id}. Maybe Favoritecharacter was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Favoritecharacter with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Favoritecharacter.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Favoritecharacter was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Favoritecharacter with id=${id}. Maybe Favoritecharacter was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Favoritecharacter with id=" + id
        });
    });
};
exports.deleteAll = (req, res) => {
    Favoritecharacter.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Favoritecharacter were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Favoritecharacter."
        });
    });
};