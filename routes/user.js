const express = require('express');

const router = express.Router();

router.get('/',(req, res, next) => {
    res.send('<html><h1>Your Tasks</<h1></html>');
});

module.exports = router;
