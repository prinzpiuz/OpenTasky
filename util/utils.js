const TimeSheet = require("../models/timesheet");
const Task = require("../models/task");
var methods = {};

methods.DAYOVER = 0;
methods.SAMEDAY = 1;

methods.checkTime = function(id,cb) {
  TimeSheet.findByPk(id).then(timesheet => {
    Task.findByPk(timesheet.task_id)
      .then(task => {
        now = new Date();
        startTime = task.start_date;
        time_diff = now - startTime;
        total_hours = time_diff / 3600000; //to convert the time to hour format
        cb(total_hours<=8);
      });
  })

};

methods.logOutTime = function(startDate) {
  const logouttime = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    0,
    0,
    0,
    0
  );
  logouttime.setUTCHours(6);
  logouttime.setUTCDate(startDate.getDate());
  return logouttime;
};

module.exports = methods;
