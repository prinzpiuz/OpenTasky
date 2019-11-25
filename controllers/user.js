const Task = require("../models/task");
const User = require("../models/user");
const TimeSheet = require("../models/timesheet");
const utils = require("../util/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.getUserDetail = (req, res, next) => {
  Task.findAll({
    where: { userID: req.session.user[0].id }
  }).then(tasks => {
    var promises = [];
    for (var i = 0; i < tasks.length; i++) {
      promises.push(tasks[i].getProject());
    }
    Promise.all(promises)
      .then(promise => {
        for (i = 0; i < promise.length; i++) {
          tasks[i].projectName = promise[i].project;
        }

        return tasks;
      })
      .then(tasks => {
        res.render("user-home", {
          title: "User",
          user: req.session.user[0],
          tasks: tasks,
          url1: { link: "/login", title: "login" }
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getTaskStart = (req, res, next) => {
  start_date = new Date(Date.now());
  let id = req.body["taskId"];
  Task.findByPk(id)
    .then(task => {
      task
        .getProject()
        .then(project => {
          return project;
        })
        .then(project => {
          User.findByPk(req.session.user[0].id).then(user => {
            task.createTimesheet({
              task_name: task.task,
              task_id: task.id,
              project_name: project.project,
              date: start_date,
              total_time_taken: 0,
              userId: user.id
            });
          });
        });
      task.status = 1;
      task.start_date = start_date;
      return task.save();
    })
    .then(res.redirect("/"));
};

exports.getTaskComplete = (req, res, next) => {
  completed_date = new Date();
  var start_date;
  let id = req.body["taskId"];
  var crct_timesheet;
  var add_manually;
  var total_time;
  Task.findByPk(id)
    .then(task => {
      task.status = 2;
      start_date = task.start_date;
      task.completed_date = completed_date;
      return task.save();
    })
    .then(
      TimeSheet.findAll({
        where: {
          task_id: id,
          userId: req.session.user[0].id
        }
      }).then(timesheet => {
        if (timesheet) {
          for (i = 0; i < timesheet.length; i++) {
            if (
              timesheet[i].date.toLocaleDateString() ===
              completed_date.toLocaleDateString()
            ) {
              crct_timesheet = timesheet[i];
            }
          }
          if (crct_timesheet) {
            add_manually = false;
            TimeSheet.findByPk(crct_timesheet.id).then(timesheet => {
              time_diff = completed_date - start_date;
              timesheet.total_time_taken = time_diff / 3600000;
              return timesheet.save();
            });
          } else {
            add_manually = true;
          }
          if (add_manually) {
            if (completed_date.getDate() != start_date.getDate()) {
              TimeSheet.findAll({
                where: {
                  task_id: id,
                  userId: req.session.user[0].id
                }
              })
                .then(timesheet => {
                  for (i = 0; i < timesheet.length; i++) {
                    if (
                      timesheet[i].date.toLocaleDateString() ===
                      start_date.toLocaleDateString()
                    ) {
                      crct_timesheet = timesheet[i];
                    }
                  }
                  TimeSheet.findByPk(crct_timesheet.id).then(timesheet => {
                    logOutTime = utils.logOutTime(start_date);
                    time_diff = logOutTime - start_date;
                    timesheet.total_time_taken = time_diff / 3600000;
                    total_time = completed_date - start_date;
                    remaining_time = total_time - time_diff;
                    return timesheet.save();
                  });
                })
                .then(
                  res.render("add-manually", {
                    task_id: id,
                    title: "add time manually"
                  })
                );
            }
          } else {
            res.redirect("/");
          }
        }
      })
    );
};

exports.getPauseTask = (req, res, next) => {
  pause_time = new Date();
  let id = req.body["taskId"];
  var start_date;
  var remaining_time;
  var total_time;
  var add_manually;
  Task.findByPk(id)
    .then(task => {
      if (task.status != 2) {
        task.status = 3;
        time_till_now_in_millS = pause_time - task.start_date;
        task.till_now = time_till_now_in_millS / 360000;
        start_date = task.start_date;
        return task.save();
      }
      //need to pass message here
    })
    .then(
      TimeSheet.findAll({
        where: { task_id: id }
      }).then(timesheet => {
        timeDiff = pause_time.getMilliseconds() - timesheet[0].total_time_taken;
        total_time = timeDiff;
        utils.checkTime(timesheet[0].id, function(val) {
          if (val) {
            add_manually = false;
            //checks wheather we are in same day while pausing task
            timesheet[0].total_time_taken = timeDiff / 3600000;
            timesheet[0].save();
          } else {
            if (pause_time.getDate() != start_date.getDate()) {
              add_manually = true;
              TimeSheet.findAll({
                where: {
                  task_id: id,
                  userId: req.session.user[0].id
                }
              }).then(timesheet => {
                for (i = 0; i < timesheet.length; i++) {
                  if (
                    timesheet[i].date.toLocaleDateString() ===
                    start_date.toLocaleDateString()
                  ) {
                    crct_timesheet = timesheet[i];
                  }
                }
                TimeSheet.findByPk(crct_timesheet.id).then(timesheet => {
                  logOutTime = utils.logOutTime(start_date);
                  time_diff = logOutTime - start_date;
                  timesheet.total_time_taken = time_diff / 3600000;
                  remaining_time = total_time - time_diff;
                  return timesheet.save();
                });
              });
            }
          }
          if (add_manually) {
            res.render("add-manually", {
              remaining_time: remaining_time / 3600000,
              task_id: id,
              title: "add time manually"
            });
          } else {
            res.redirect("/");
          }
        });
      })
    );
};

exports.getResumeTask = (req, res, next) => {
  let id = req.body["taskId"];
  Task.findByPk(id)
    .then(task => {
      if (task.status == 3) {
        task.status = 1;
        return task.save();
      }
    })
    .then(res.redirect("/"));
};

exports.getTaskDetail = (req, res, next) => {
  id = req.params.uid;
  Task.findByPk(id).then(task => {
    if (task === undefined) {
      res.status(404).render("404", { url1: { link: "/", title: "Go back" } });
    } else {
      res.render("detail", {
        task: task,
        title: "Detail",
        url1: {
          link: "/",
          title: "Go back"
        }
      });
    }
  });
};

exports.getTimesheet = (req, res, next) => {
  TimeSheet.findAll({
    where: { userId: req.session.user[0].id }
  }).then(timesheets => {
    res.render("timsheet", {
      username: req.session.user[0].name,
      timesheets: timesheets,
      title: "TimeSheet",
      url1: {
        link: "/",
        title: "Tasks"
      }
    });
  });
};

exports.getAddManual = (req, res, next) => {
  data = req.body;
  task_id = req.body.task_id;
  delete data.task_id;
  for (let key in data) {
    Task.findByPk(task_id).then(task => {
      task
        .getProject()
        .then(project => {
          return project;
        })
        .then(project => {
          User.findByPk(req.session.user[0].id).then(user => {
            task.createTimesheet({
              task_name: task.task,
              task_id: task.id,
              project_name: project.project,
              date: new Date(key),
              total_time_taken: parseFloat(data[key]),
              userId: user.id
            });
          });
        });
    });
  }
  res.status(200).json({
    message: "Time added successfully!"
  });
};
