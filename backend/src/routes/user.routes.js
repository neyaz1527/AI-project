const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser } = require("../controllers/user.controller");

router.get("/users", getUsers);

router.post("/users", createUser)

router.delete("/users/:id", deleteUser)

module.exports = router;
