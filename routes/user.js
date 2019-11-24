const express = require('express');
const router = express.Router();
const AdditionalMiddle = require('../middleware/middlewares');
const user = require('../controllers/user')

router.get('/',AdditionalMiddle.isLogged, user.getUserDetail);

router.post('/task-start',AdditionalMiddle.isLogged, user.getTaskStart);

router.post('/task-complete',AdditionalMiddle.isLogged, user.getTaskComplete);

router.post('/task-pause',AdditionalMiddle.isLogged, user.getPauseTask);

router.post('/task-resume',AdditionalMiddle.isLogged, user.getResumeTask);

router.get('/task-detail/:uid',AdditionalMiddle.isLogged, user.getTaskDetail);

router.get('/timesheet', AdditionalMiddle.isLogged, user.getTimesheet);

module.exports = router;
