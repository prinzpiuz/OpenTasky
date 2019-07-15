const Task = require('../models/task');
const User = require('../models/user');



exports.getAddTask = (req, res, next) => {
    User.findAll().then(users => {
        res.render('add-task', {

            users: users,
            title: "Add Task",
            edit: false
        }
        );
    });

};

exports.getTaskAssign = (req, res, next) => {
    let id = req.body['user-id'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    User.findByPk(id).then(user =>{
        user.createTask({
            userName: user.name,
            task: task,
            reference: ref,
            status: 0,
        })
        res.render('assign', {
            user: user.name,
            task: task,
            title: "Assign",
            url1: { link: "/admin", title: "users" },
            url2: { link: "/admin/add-task", title: "Add Task" }
        });
    })
    .catch(err => {
        console.log(err);
    });

};

exports.getTaskAssigned = (req, res, next) => {
    User.findAll().then(user => {
        res.render('admin',
            {
                users: user,
                title: "Admin",
                url1: { link: "/admin/add-user", title: "add-user" },
                url2: { link: "/admin/add-task", title: "Add Task" },
                url3: { link: "/admin/list-users", title: "List users" }
            });
    });
};

exports.getAllTaskUser = (req, res, next) => {
    Task.findAll({
        include: [
            { model: User, where: { id: req.params.uid } }
        ]
    }).then(task_added => {
        res.render('user-tasks',
            {
                task_added: task_added,
                title: "Admin",
                url1: { link: "/admin/add-user", title: "add-user" },
                url2: { link: "/admin/add-task", title: "Add Task" },
                url3: { link: "/admin/list-users", title: "List users" }
            });
    });
};

exports.getTaskEdit = (req, res, next) => {
    const edit = req.query.edit;
    const id = req.params.uid;
    Task.findByPk(id).then( task => {
        User.findAll().then(user => {
            res.render('add-task',
                {
                    users: user,
                    edit: edit,
                    task: task,
                    tittle: "Edit Task",
                    url1: {
                        link: "/admin/",
                        title: "Go back"
                    }
                }
            );
        })
    });

};

exports.postEditTask = (req, res, next) => {
    let id = req.body['user-id'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    let task_id = req.body['id'];
    User.findByPk(id).then(user => {
        Task.findByPk(task_id).then(taskEdit => {
        taskEdit.userId = user.id;
        taskEdit.userName = user.name;
        taskEdit.task = task;
        taskEdit.ref = ref;
        return taskEdit.save();
    })}).then(
        res.redirect('/admin')
    );
        };

exports.getTaskDetail = (req, res, next) => {
    id = req.params.uid;
    Task.findByPk(id).then( task => {
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
    Task.findByPk(id).then(task =>{
        task.destroy();
    }).then(
        res.redirect('/')
    );
};

exports.getAddUser = (req, res, next) => {
    res.render('add-user', {
        title: "Add User",
        edit: false
    });
};

exports.getUserAdded = (req, res, next) => {
    let name = req.body['name'];
    let email = req.body['email'];
    User.create({
        name: name,
        email: email
    }).then(
        res.render('user-added', {
            user: name,
            title: "User-Added",
            url1: { link: "/admin/list-users", title: "list-users" },
            url2: { link: "/admin/add-task", title: "Add Task" }
        })
    );
};

exports.getListUser = (req, res, next) => {
    User.findAll().then(user => {
        res.render('users',
            {
                users: user,
                title: "users",
                url1: { link: "/admin/add-user", title: "add-user" },
                url2: { link: "/admin/add-task", title: "Add Task" }
            });
    });
};

exports.getUserDetail = (req, res, next) => {
    id = req.params.uid;
    User.findByPk(id).then(user => {
        if (user === undefined) {
            res.status(404).render('404', { url1: { link: "/admin", title: "Go back" } });
        }
        else {
            res.render('user-detail', {
                user: user,
                title: "Detail",
                url1: {
                    link: "/admin/",
                    title: "Go back"
                }
            });
        }
    });
};

exports.getUserEdit = (req, res, next) => {
    const edit = req.query.edit;
    const id = req.params.uid;
    User.findByPk(id).then(user => {
            res.render('add-user',
                {
                    users: user,
                    edit: edit,
                    tittle: "Edit User",
                    url1: {
                        link: "/admin/list-users",
                        title: "Go back"
                    }
                }
            );
        });
};

exports.getUserEdit_done = (req, res, next) => {
    let id = req.body['id'];
    let username = req.body['name'];
    let email = req.body['email'];
    User.findByPk(id).then(user => {
        user.name = username;
            user.email = email;
            return user.save();
        }).then(
        res.redirect('/admin/list-users')
    );
};


// exports.getTaskStart = (req, res, next) => {
//     start_date = new Date();
//     let id = req.params.task_id;
//     Task.findByPk(id).then(task => {
//         task.status = 1,
//         task.start_date = start_date,
//         return taskEdit.save()
