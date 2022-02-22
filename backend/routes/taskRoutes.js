import express from "express";
import taskController from "../controllers/taskController.js";
import taskMidd from "../middleware/taskValidate.js";
const router = express.Router();

router.post(
  "/registerTask",
  taskMidd.existingTask,
  taskMidd.existingRolUser,
  taskController.registerTask
);

router.get("/listTask/:name?", taskController.listTask);
router.delete("/delete/:_id", taskController.deleteTask);
router.put("/updateTask", taskController.updateTask);

export default router;
