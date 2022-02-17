import user from "../models/user.js";

 /**esta funcion es para verificar en la BD de que el usuario no este registrado
  y no se repita, se hace la validacion con el correo porque es un dato unico*/
//Creamos la funcion para validar si el registro del email existe
const existingUser = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingEmail = await user.findOne({ email: req.body.email });
  if (existingEmail)
    return res.status(400).send({ message: "The user is already registered" });

  next();
};

export default { existingUser };
