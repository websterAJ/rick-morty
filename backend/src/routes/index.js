const express = require("express");
const router = express.Router();

const characters = require("./characterRoute");
const favorites = require("./favoritecharaterRoute");
const users = require("./usersRoute");

router.use("/character", characters);
router.use("/favorite", favorites);
router.use("/users", users);

module.exports = router;
