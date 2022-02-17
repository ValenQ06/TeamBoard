//Creacion de coleccion del roll

//llamo a la libreria que me permite trabajar con json
import mongoose from "mongoose";

//Creo la coleccion role de la BD en mongoDB
const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const role = mongoose.model("roles", roleSchema);
export default role;
