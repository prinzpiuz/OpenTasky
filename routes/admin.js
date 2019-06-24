const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/add-task', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'templates', 'add-task.html'));
});
router.post('/assigned', (req, res, next) => {
  console.log(req.body);
  let user = req.body['user'];
  let task = req.body['task'];
  str = "<html><h1>task " + task + " for user " + user + " added</<h1></html>";
  res.send(str);
});
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', 'templates', 'admin.html'));
});

module.exports = router;
