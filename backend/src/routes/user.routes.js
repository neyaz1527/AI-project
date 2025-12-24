const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/user.controller");

router.get("/users", getUsers);

router.post("/users", createUser)

module.exports = router;
