const Task = require('../models/task');



exports.getAddTask = (req, res, next) => {
    res.render('add-task', {
        title: "Add Task",
        edit: false
    }
    );
};

exports.getTaskAssign = (req, res, next) => {
    let user = req.body['user'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    const tasks = new Task(null, task, user, ref)
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

exports.getTaskEdit = (req, res, next) => {
    const edit = req.query.edit;
    const id = req.params.uid;
    Task.findTask(id, task => {
        res.render('add-task',
            {
                edit: edit,
                task : task,
                tittle: "Edit Task",
                url1: {
                    link: "/admin/",
                    title: "Go back"
                }
            }
        );
    });

};

exports.postEditTask = (req, res, next) => {
    let user = req.body['user'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    let id = req.body['id'];
    const taskedited = new Task(id, task, user, ref)
    taskedited.save();
    res.redirect('/admin');
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
    res.redirect('/');
};