const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const {
  getAllTasks,
  newTask,
  getTask,
  deleteTask
} = require('../controllers/TaskControllers');

router.use(requireAuth);
router.get('/', getAllTasks);
router.post('/', newTask);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);

module.exports = router;

