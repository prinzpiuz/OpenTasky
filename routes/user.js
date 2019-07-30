const express = require('express');
const router = express.Router();
const AdditionalMiddle = require('../middleware/middlewares');
const user = require('../controllers/user')

router.get('/',AdditionalMiddle.isLogged, user.getUserDetail);

module.exports = router;
