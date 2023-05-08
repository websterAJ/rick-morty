const db = require("../models");
const Usuarios = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
     if (!req.body.pass || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const usuario = {
        pass: req.body.pass,
        email: req.body.email,
    };
    Usuarios.create(usuario).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the usuarios."
        });
    });
};
exports.findAll = (req, res) => {
    Usuarios.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving usuarios."
        });
    });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    if (id != null) {
        Usuarios.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Usuarios with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Usuarios with id=" + id
            });
        });
    }else if(email != null) {
        Usuarios.findOne({where:{'email':email}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Usuarios with email=${email}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Usuarios with email=" + email
            });
        });
    }
};
exports.update = (req, res) => {
    const id = req.params.id;
    Usuarios.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Usuarios was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Usuarios with id=${id}. Maybe Usuarios was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Usuarios with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Usuarios.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Usuarios was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Usuarios with id=${id}. Maybe Usuarios was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Usuarios with id=" + id
        });
    });
};
exports.deleteAll = (req, res) => {
    Usuarios.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Usuarios were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Usuarios."
        });
    });
};