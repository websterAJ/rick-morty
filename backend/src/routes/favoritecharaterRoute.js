const express = require("express");
const FavoriteCharacter = require("../controllers/FavoriteCharacterControllers");
const router = express.Router();

router.get("/all",FavoriteCharacter.findAll)
router.get("/:id",FavoriteCharacter.findOne)
router.get("/:idUser",FavoriteCharacter.findOne)
router.put("/update",FavoriteCharacter.update)
router.post("/create",FavoriteCharacter.create)
router.delete("/delete/:id",FavoriteCharacter.delete)
router.delete("/delete",FavoriteCharacter.deleteAll)

module.exports= router