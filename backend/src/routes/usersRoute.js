const express = require("express");
const usuarios = require("../controllers/UsersControllers");
const router = express.Router();

router.get("/all",usuarios.findAll)
router.get("/:id",usuarios.findOne)
router.get("/:email",usuarios.findOne)
router.put("/update",usuarios.update)
router.post("/create",usuarios.create)
router.delete("/delete/:id",usuarios.delete)
router.delete("/delete",usuarios.deleteAll)

module.exports= router