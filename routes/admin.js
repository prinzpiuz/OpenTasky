const express = require('express');
const path = require('path');
const router = express.Router();

const taskController = require('../controllers/admin');

router.get('/add-user', taskController.getAddUser);

router.get('/add-task', taskController.getAddTask);

router.get('/list-users', taskController.getListUser);

router.post('/user-added', taskController.getUserAdded);

router.post('/edit-user-done', taskController.getUserEdit_done);

router.get('/edit/user/:uid',taskController.getUserEdit);

router.post('/assigned', taskController.getTaskAssign);

router.get('/user/tasks/:uid', taskController.getAllTaskUser);

router.post('/start/:task_id', taskController.getTaskStart);

router.get('/', taskController.getTaskAssigned);

router.get('/user-detail/:uid', taskController.getUserDetail);

router.get('/details/:uid', taskController.getTaskDetail);

router.get('/delete/:uid', taskController.getTaskDelete);

router.post('/edit-complete', taskController.postEditTask);

router.get('/edit/:uid', taskController.getTaskEdit);

exports.routes = router;
