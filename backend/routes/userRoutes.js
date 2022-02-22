import express from "express";
import userController from "../controllers/userController.js";
import userMidd from "../middleware/userValidate.js";
import roleMidd from "../middleware/roleValidate.js";
const router = express.Router();

//http://localhost:3001/api/user/registerUser
router.post(
  "/registerUser",
  userMidd.existingUser,
  roleMidd.existingRole,
  userController.registerUser
);
//aqui le pongo el parametro name porque es el filtro que hice en listUser
router.get("/listUser/:name?", userController.listUser);
router.get("/listUserAdmin/:name?", userController.listUserAdmin);
router.post("/login", userController.login);
router.put("/delete/:_id", userController.deleteUser); //aqui tiene que ir obligatoriamente el id
router.put("/updateUserAdmin", userController.updateUserAdmin);
export default router;
