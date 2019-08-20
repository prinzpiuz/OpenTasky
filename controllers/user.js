const Task = require('../models/task');
const User = require('../models/user');

exports.getUserDetail = (req, res, next) => {
    Task.findAll({
        include: [
            { model: User, where: { id: req.session.user[0].id } }
        ]
    }).then(tasks => {
    res.render('user-home', { 
        title: "User",
        user: req.session.user[0],
        tasks:tasks,
        url1: { link: "/login", title: "login" }});
    });
};

exports.getTaskStart = (req, res, next) => {
    start_date = new Date();
    let id = req.body['taskId'];
    Task.findByPk(id).then(task => {
        task.status = 1;
        task.start_date = start_date;
        return task.save();
    }).then(
        res.redirect('/' )
    );
};

exports.getTaskComplete = (req, res, next) => {
    completed_date = new Date();
    let id = req.body['taskId'];
    Task.findByPk(id).then(task => {
        task.status = 2;
        task.completed_date = completed_date;
        return task.save();
    }).then(
        res.redirect('/')
    );
};

exports.getTaskDetail = (req, res, next) => {
    id = req.params.uid;
    Task.findByPk(id).then( task => {
        if (task === undefined){
            res.status(404).render('404', { url1: { link: "/", title: "Go back" } });
        }
        else {
        res.render('detail', {
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