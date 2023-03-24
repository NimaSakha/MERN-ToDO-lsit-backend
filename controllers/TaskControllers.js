const task = require('../models/TaskModel');
const mongoose = require('mongoose');

const getAllTasks = async (req, res) => {
  try {
    const User_id = req.user._id;
    const tasks = await task.find({ User_id });
    res.status(200).json({ res: tasks });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }
  console.log(id);
  try {
    const Task = await task.findById(id);
    res.status(200).json({ Task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const newTask = async (req, res) => {
  try {
    const { TaskName, Taskdesc } = req.body;
    const User_id = await req.user._id;
    const Task = await task.create({
      Name: TaskName,
      Desc: Taskdesc,
      User_id
    });
    res.status(200).json({ Task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const Task = await task.findOneAndDelete({ _id: id });

    res.status(200).json(Task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getAllTasks, newTask, getTask, deleteTask };

