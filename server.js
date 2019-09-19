const path = require('path');
// third party
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const sequelize = require('./util/db');
const Task = require('./models/task');
const User = require('./models/user');
const Project = require('./models/project');


app.set('view engine', 'pug');
app.set('views', 'templates');

app.use(bodyParser.urlencoded({extented: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: new PostgreSqlStore({
            /*
            connection string is built by following the syntax:
            postgres://USERNAME:PASSWORD@HOST_NAME:PORT/DB_NAME
            */
            conString: "postgres://task:task@localhost:5432/task"
        })
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
  });

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(authRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', { url1: { link: "/", title: "Home" }});
});

Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
Task.belongsTo(Project, { constraints: true, onDelete: 'CASCADE' });
Project.hasMany(Task);

sequelize
    // .sync({force:true})
    .sync()
    .then(result => {
        app.listen(3000);
        User.findAll({
            where: {
                role: 1
            }}).then(user=>{
                if(!user[0]){
                    User.create({
                        name: 'admin',
                        email: 'admin@admin.com',
                        role: 1,
                        password: 'admin',
                        status: 1
                }).then(console.log('admin created'));
            }
            });
    })
    .catch(err => {
        console.log(err);
    });



