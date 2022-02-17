//Creacion de los controladores - son mis funciones, acciones del codigo

//importo el archivo role de la carpeta models para poderlo utilizar
import role from "../models/role.js";

//Creamos la funcion registrar roles
const registerRole = async (req, res) => {
  //aqui estoy preguntando si alguno de estos dos datos esta vacio (name, descripcion)
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  //creo la variable Schema donde voy a utilizar el Schema de la BD que necesito trabajar
  let schema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await schema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register role" });

  res.status(200).send({ result });
};

//exportamos la funcion para que cualquira la pueda usar
export default { registerRole };
