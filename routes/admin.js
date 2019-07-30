const express = require('express');
const router = express.Router();
const AdditionalMiddle = require('../middleware/middlewares');
const taskController = require('../controllers/admin');

router.post('/start',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskStart);

router.post('/complete',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskComplete);

router.get('/add-user',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getAddUser);

router.get('/add-task',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getAddTask);

router.get('/list-users',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getListUser);

router.post('/user-added',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getUserAdded);

router.post('/edit-user-done',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getUserEdit_done);

router.get('/edit/user/:uid',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getUserEdit);

router.post('/assigned',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskAssign);

router.get('/user/tasks/:uid',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getAllTaskUser);

router.get('/',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskAssigned);

router.get('/user-detail/:uid',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getUserDetail);

router.get('/details/:uid',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskDetail);

router.get('/delete/:uid',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskDelete);

router.post('/edit-complete',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.postEditTask);

router.get('/edit/:uid',AdditionalMiddle.isLogged, AdditionalMiddle.isAdmin, taskController.getTaskEdit);

module.exports = router;
