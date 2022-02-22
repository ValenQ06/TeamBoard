import task from "../models/task.js";

const registerTask = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.imageUrl)
    return res.status(400).send({ message: "Incomplete data" });

  const taskSchema = new task({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    taskStatus: "to-do",
  });

  const result = await taskSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register task" });
  res.status(200).send({ result });
};

const listTask = async (req, res) => {
  let tasks = await task.find({ name: new RegExp(req.params["name"]) }).exec();

  return tasks.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ tasks });
};

const deleteTask = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const tasks = await task.findByIdAndDelete(req.params["_id"]);

  return !tasks
    ? res.status(400).send({ message: "Error deleting task" })
    : res.status(200).send({ message: "Task deleted" });
};

const updateTask = async (req, res) => {
  if (!req.body.taskStatus)
    return res.status(400).send({ message: "Incomplete data" });

  const editTask = await task.findByIdAndUpdate(req.body._id, {
    taskStatus: req.body.taskStatus,
  });
  if (!editTask) return res.status(500).send({ message: "Error editing task" });
  return res.status(200).send({ message: "Task Updated" });
};

export default { registerTask, listTask, deleteTask, updateTask };
