const db = require("../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.email && !req.body.pass) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a user
    const usuario = {
        email: req.body.email,
        pass: req.body.pass
    };
    // Save user in the database
    user.create(usuario).then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the user."
        });
    });
}

exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    user.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving user."
        });
    });
};
// Find a single Usuario with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    if (id != null) {
        user.findByPk(id).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
    }else if(email != null) {
        user.findOne({where:{'email':email}}).then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
    }
};
exports.update = (req, res) => {
    const id = req.params.id;
    user.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num === 1) {
            res.send({
            message: "user was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating user with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    user.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "user was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete user with id=" + id
        });
    });
};
exports.deleteAll = (req, res) => {
    user.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} user were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all user."
        });
    });
};