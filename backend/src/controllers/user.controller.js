const userService = require("../services/user.service");

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  console.log("post body", req.body)
  try {
    const {name, email} = req.body;
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error:err.message})
  }
}
