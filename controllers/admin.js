const Task = require('../models/task');



exports.getAddTask = (req, res, next) => {
    res.render('add-task');
};

exports.getTaskAssign = (req, res, next) => {
    let user = req.body['user'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    const tasks = new Task(task, user, ref)
    tasks.save();
    res.render('assign', { user: user, task: task });
};

exports.getTaskAssigned = (req, res, next) => {
    Task.getData(task_added =>{
        res.render('admin',
        {
            task_added: task_added,
            title: "Admin",
            url1: { link: "", title: "users" },
            url2: { link: "/admin/add-task", title: "Add Task" }
        });
    });

};
