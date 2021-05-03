const express = require('express');

const { addUser, loginUser } = require('./controllers/userController');
const {
  getLists,
  addList,
  deleteList,
  updateListsOrder,
  updateTasksOrder,
} = require('./controllers/listController');
const {
  addSection,
  updateSection,
  deleteSection,
} = require('./controllers/sectionController');
const {
  addNewTask,
  addExistingTask,
  updateTask,
} = require('./controllers/taskController');

const router = express.Router();

// Users
router.post('/users', addUser);

router.post('/users/login', loginUser);
// Lists
router.get('/users/:userId/lists', getLists);

router.post('/users/:userId/lists', addList);

router.put('/users/:userId/lists', updateListsOrder);

router.delete('/users/:userId/lists/:listId', deleteList);

router.put('/users/:userId/lists/:listId/order', updateTasksOrder);

// Sections

router.post('/users/:userId/lists/:listId/sections', addSection);

router.put('/users/:userId/lists/:listId/sections/:sectionId', updateSection);

router.delete('/users/:userId/lists/:listId/sections/:sectionId', deleteSection);

// Tasks

router.post('/users/:userId/lists/:listId/sections/:sectionId/tasks', addNewTask);

router.put('/users/:userId/lists/:listId/sections/:sectionId/tasks', addExistingTask);

router.put('/users/:userId/tasks/:taskId', updateTask);

module.exports = router;
