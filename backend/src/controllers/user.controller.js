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
  // console.log("post body", req.body)
  try {
    const {name, email} = req.body;
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error:err.message})
  }
}

// exports.deleteUser = async (req, res) => {
//   console.log("post body", req.param.id)
//   try{
//     const {id} = req.param.id;
//     const deleteUser = await userService.deleteUser(id);
//     res.status(201).json(deleteUser);
//   } catch (err){
//     res.status(500).json({ error:err.message})
//   }
// }

exports.deleteUser = async (req, res) => {
  console.log(req.params)
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

