const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.get('/checkEmail', authController.getCheckEmail);

router.post('/checkEmail', authController.postCheckEmail);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

// router.post('/logout', authController.postLogout);

module.exports = router;
