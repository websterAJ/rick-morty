const db = require("../models");
const favoritecharater = db.favoritecharater;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
     if (!req.body.idUser || !req.body.idCharacter) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const newFavoritecharater = {
        id_user: req.body.idUser,
        id_character: req.body.idCharacter,
    };
    favoritecharater.create(newFavoritecharater).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the favoritecharater."
        });
    });
};
exports.findAll = (req, res) => {
    favoritecharater.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving favoritecharater."
        });
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    const idUser = req.params.idUser;
    if (id != null) {
        favoritecharater.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find favoritecharater with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving favoritecharater with id=" + id
            });
        });
    }else if(idUser != null) {
        favoritecharater.findOne({where:{'id_user':idUser}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find favoritecharater with idUser=${idUser}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving favoritecharater with idUser=" + idUser
            });
        });
    }
};
exports.update = (req, res) => {
    const id = req.params.id;
    favoritecharater.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "favoritecharater was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update favoritecharater with id=${id}. Maybe favoritecharater was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating favoritecharater with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    favoritecharater.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "favoritecharater was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete favoritecharater with id=${id}. Maybe favoritecharater was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete favoritecharater with id=" + id
        });
    });
};
exports.deleteAll = (req, res) => {
    favoritecharater.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} favoritecharater were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all favoritecharater."
        });
    });
};