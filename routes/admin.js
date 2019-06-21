const express = require('express');

const router = express.Router();


router.get('/add-user', (req, res, next) => {
  res.send("<form action='/users' method='POST'><input type='text' name='user'></br><input type='text' name='task'><button type='submit'>submit</button></form>");
});

router.post('/users', (req, res, next) => {
  console.log(req.body);
  let user = req.body['user'];
  let task = req.body['task'];
  str = "<html><h1>task " + task + " for user " + user + " added</<h1></html>";
  res.send(str);
});

module.exports = router;
