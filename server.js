const path = require('path');
// third party
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminData = require('./routes/admin');
const userRoutes = require('./routes/user');

app.set('view engine', 'pug');
app.set('views', 'templates');


app.use(bodyParser.urlencoded({extented: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminData.routes);
app.use(userRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', { url1: { link: "/", title: "Home" }});
});

app.listen(3000);


