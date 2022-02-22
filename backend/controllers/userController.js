//importamos librerias y rutas de los archivos que vayamos a necesitar
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

//Creamos la funcion
const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  //esta variables es para encriptar la contraseña
  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  //guardamos todo en la BD
  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  //aqui vamos a generar el token para confirmar los datos guardados
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

//Creamos la funcion para enlistar los usuarios y se crea el filtro de buscar por el nombre
const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  //si el tamaño del array es 0 esta vacio, asi lo comparamos
  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

//este es otro filtro para que traiga los usuarios que esten activos en la BD, que esten en true
const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();
  //si el tamaño del array es 0 esta vacio, asi lo comparamos
  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

//Se crea el login del usuario
const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "User not found" });

  //Validamos la contraseña encriptada
  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  //generamos el Json web token
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

//funcion eliminar el usuario pero no del todo lo pondria en falso para no borrar los datos de la BD
const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" }); //se debe de eliminar un usuario por su id porque si no eliminamos a todos

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

//Creamos la funcion para editar y actualizar los datos de un usuario
const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";
  //si el password es falso, si no llego, si esta vacio vamos a hacer una busqueda del usuario
  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });
  if (!editUser) return res.status(500).send({ message: "Error editing user" });
  return res.status(200).send({ message: "User Updated" });
};

export default {
  registerUser,
  listUser,
  login,
  deleteUser,
  listUserAdmin,
  updateUserAdmin,
};
