//Creacion del servidor

//importamos las librerias y archivos que vamos a utilizar para la contruciion del servidor
import express from "express"; //arma el servidor
import cors from "cors"; //se encarga de los protocolos
import db from "./db/db.js"; //llama a la BD
import roleRoutes from "./routes/roleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv"; //hace saber que se esta tranajando con variales de entorno

dotenv.config(); // ejecuto la libreria dotenv
const app = express(); //ejecuto la libreria express y creo la variable app que es mi servidor
app.use(express.json()); //le digo que todo el servidor va a manejat json
app.use(cors()); //le digo que todo el servidor va a utilizar la libreria cors
app.use("/api/role", roleRoutes); //aqui le digo que va a utilizar la api roleRoutes
app.use("/api/user", userRoutes);

//llamo al puerto que tengo en el archivo .env
app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: ", process.env.PORT)
);

//llamo a la funcion de la BD que esta en el archivo db
db.dbConnection();
