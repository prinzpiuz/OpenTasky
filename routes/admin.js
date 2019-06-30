const express = require('express');
const path = require('path');
const router = express.Router();

const taskController = require('../controllers/admin');

router.get('/add-task', taskController.getAddTask);

router.post('/assigned', taskController.getTaskAssign);

router.get('/', taskController.getTaskAssigned);

router.get('/details/:uid', taskController.getTaskDetail);


exports.routes = router;
