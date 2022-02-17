//Importamos la libreria express
import express from "express";

//importamos el modulo de roleController
import roleController from "../controllers/roleController.js";

//ejecutamos la libreria express
const router = express.Router();

//http://localhost:3001/api/role/registerRole
router.post("/registerRole", roleController.registerRole);

export default router;
