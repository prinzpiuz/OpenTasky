const Task = require('../models/task');
const User = require('../models/user');
const Project = require('../models/project');



exports.getAddTask = (req, res, next) => {
        Project.findAll().then(projects => {
            res.render('add-task', {

                projects: projects,
                title: "Add Task",
                edit: false
            }
            );
        });
};

exports.getTaskEdit = (req, res, next) => {
    const edit = req.query.edit;
    const id = req.params.uid;
    Task.findByPk(id).then( task => {
        Project.findAll().then(projects => {
            res.render('add-task',
                {
                    projects: projects,
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


exports.getAddProject = (req, res, next) => {
    User.findAll().then(users => {
        res.render('add-project', {
            users: users,
            title: "Add Project",
            edit: false
        }
        );
    })

};

exports.getPostAddProject = (req, res, next) => {
    let project_name = req.body['project'];
    let type = req.body['projectType'];
    let users = req.body['users'];
    console.log('users', users)

    Project.create({
        project: project_name,
        type: type
    }).then(project => {
        project.addUsers(users);
    })
    res.render('project-added', {
        project: project_name,
        title: "project-added",
        url1: { link: "/admin/projects", title: "projects" },
        url2: { link: "/admin/add-task", title: "Add Task" }

    });
};

exports.getListProjects = (req, res, next) => {
    Project.findAll().then(projects => {
        res.render('projects',
            {
                projects: projects,
                title: "projects",
                url1: { link: "/admin/add-project", title: "add-project" },
                url2: { link: "/admin/add-task", title: "Add Task" }
            });
    });
};

exports.getProjectUsers = (req, res, next) => {
    Project.findByPk(req.params.pid).then(project => {
        var message = [];
        project.getUsers().then(users => {
            for(var i = 0; i < users.length; i++){
                data = { 'id': users[i].id,
                    'name': users[i].name
            }
                message.push(data);
            }
        }).then(() => {
            res.status(200).json({ 'message': message });
        }

        );
    });
};



exports.deleteProject = (req, res, next) => {
    id = req.params.pid;
    Project.findByPk(id).then(project =>{
        project.destroy();
    }).then(
        res.redirect('/admin/projects')
    );
};

exports.getTaskAssign = (req, res, next) => {

    let id = req.body['user-id'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    let project_id = req.body['project'];

    Project.findByPk(project_id).then(project =>{
    User.findByPk(id).then(user => {
            project.createTask({
                task: task,
                reference: ref,
                status: 0,
                userID: id,
                userName: user.name
        })
            res.render('assign', {
                user: user.name,
                task: task,
                title: "Assign",
                url1: { link: "/admin", title: "users" },
                url2: { link: "/admin/add-task", title: "Add Task" }
        });
        })
    })
    .catch(err => {
        console.log(err);
    });

};

exports.postEditTask = (req, res, next) => {
    let id = req.body['user-id'];
    let task = req.body['task'];
    let ref = req.body['reference'];
    let task_id = req.body['id'];
    User.findByPk(id).then(user => {
        Task.findByPk(task_id).then(taskEdit => {
        taskEdit.userID = user.id;
        taskEdit.userName = user.name;
        taskEdit.task = task;
        taskEdit.reference = ref;
        return taskEdit.save();
    })}).then(
        res.redirect('/admin')
    );
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
        where:{userID:req.params.uid}
    }).then(task_added => {
        var promises = [];
        for(var i = 0; i<task_added.length;i++){
            promises.push(task_added[i].getProject());
        }
        Promise.all(promises).then(promise => {
            for(i=0;i<promise.length;i++){
                task_added[i].projectName = promise[i].project
            }
                return task_added;
        }).then(task_added => {
            res.render('user-tasks',
        {
            task_added: task_added,
            title: "Admin",
            url1: { link: "/admin/add-user", title: "add-user" },
            url2: { link: "/admin/add-task", title: "Add Task" },
            url3: { link: "/admin/list-users", title: "List users" }
        })
    }
        ).catch(err => {
            console.log(err);
        });
        
});
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
        res.redirect('/admin/user/tasks/'+id)
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
    let role = req.body['role'];
    User.create({
        name: name,
        email: email,
        role: role,
        password: 'test',
        status: 0
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
    let role = req.body['role'];
    User.findByPk(id).then(user => {
        user.name = username;
            user.role = role;
            user.email = email;
            return user.save();
        }).then(
        res.redirect('/admin/list-users')
    );
};

exports.getTaskStart = (req, res, next) => {
    start_date = new Date();
    let id = req.body['taskId'];
    let userId = req.body['userId'];
    Task.findByPk(id).then(task => {
        task.status = 1;
        task.start_date = start_date;
        return task.save();
    }).then(
        res.redirect('/admin/user/tasks/' + userId)
    );
};

exports.getTaskComplete = (req, res, next) => {
    completed_date = new Date();
    let id = req.body['taskId'];
    let userId = req.body['userId'];
    Task.findByPk(id).then(task => {
        task.status = 2;
        task.completed_date = completed_date;
        return task.save();
    }).then(
        res.redirect('/admin/user/tasks/' + userId)
    );
};