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
    res.render('assign', {
        user: user,
        task: task,
        title: "Assign",
        url1: { link: "/admin", title: "users" },
        url2: { link: "/admin/add-task", title: "Add Task" }
    });
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


exports.getTaskDetail = (req, res, next) => {
    id = req.params.uid;
    Task.findTask(id, task => {
        if (task === undefined){
            res.status(404).render('404', { url1: { link: "/admin", title: "Go back" } });
        }
        else {
        res.render('detail', {
            task: task,
            title: "Detail",
            url1: {
                link: "/admin/",
                title: "Go back"
            }
        });
    }
    });
};


exports.getTaskDelete = (req, res, next) => {
    id = req.params.uid;
    Task.deleteTask(id);
    res.redirect('/admin/');
}