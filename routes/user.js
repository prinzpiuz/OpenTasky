const express = require('express');
const path = require('path');

const adminData = require('./admin');
const router = express.Router();

router.get('/',(req, res, next) => {
    console.log(adminData.taskUpdate);
    res.render('users');
});

module.exports = router;
