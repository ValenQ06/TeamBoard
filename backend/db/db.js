//Creacion de la conexion a la BD

//importo la variable mongoose para establecer la conexion con mongodb
import mongoose from "mongoose";

//creo una funcion para establecer la conexion a la BD
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: OK");
  } catch (error) {
    console.log("Error connecting to MondoDB: \n ", error);
  }
};
//exporto la funcion de este modulo para poder llamarla desde cualquier otro archivo
export default { dbConnection };
