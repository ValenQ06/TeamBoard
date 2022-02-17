import role from "../models/role.js";

//aqui vamos a la BD para buscar el role del usuario
const existingRole = async (req, res, next) => {
  const roleId = await role.findOne({ name: "user" });
  if (!roleId) return res.status(500).send({ message: "No role was assigned" });

  //Se agregan los datos al objeto: req.body --> role: roleId._id
  req.body.role = roleId._id;
  next();
};

export default { existingRole };
