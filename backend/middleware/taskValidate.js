import task from "../models/task.js";
import user from "../models/user.js";

const existingTask = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingName = await task.findOne({ name: req.body.name });
  if (existingName)
    return res.status(400).send({ message: "The task is already registered" });

  next();
};

const existingRolUser = async (req, res, next) => {
  const taskId = await user.findOne({ user: "user" });
  if (!taskId) return res.status(500).send({ message: "No user was assigned" });

  req.body.user = taskId._id;
  next();
};

export default { existingTask, existingRolUser };
