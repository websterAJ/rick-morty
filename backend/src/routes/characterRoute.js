const express = require("express");
const Character = require("../controllers/CharacterControllers");
const router = express.Router();

router.get("/all",Character.findAll)
router.get("/:id",Character.findOne)
router.get("/:name",Character.findOne)
router.put("/update",Character.update)
router.post("/create",Character.create)
router.delete("/delete/:id",Character.delete)
router.delete("/delete",Character.deleteAll)

module.exports= router