const express = require('express');
const router = express.Router();
const AdditionalMiddle = require('../middleware/middlewares');
const user = require('../controllers/user')

router.get('/',AdditionalMiddle.isLogged, user.getUserDetail);

router.post('/task-start',AdditionalMiddle.isLogged, user.getTaskStart);

router.post('/task-complete',AdditionalMiddle.isLogged, user.getTaskComplete);

router.get('/task-detail/:uid',AdditionalMiddle.isLogged, user.getTaskDetail);

module.exports = router;
