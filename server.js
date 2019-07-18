const path = require('path');
// third party
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);

const app = express();

const adminData = require('./routes/admin');
const userRoutes = require('./routes/user');
const sequelize = require('./util/db');
const Task = require('./models/task');
const User = require('./models/user');

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

app.use('/admin',adminData.routes);
app.use(userRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', { url1: { link: "/", title: "Home" }});
});

Task.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Task);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });



