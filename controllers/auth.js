const User = require('../models/user');

exports.getLogin = (req, res, next) =>{
    res.render('auth/login',
        {title: 'Login'}
    );
};

exports.postLogin = (req, res, next) => {
    const email = req.body['email'];
    const password = req.body['password'];
    User.findAll({
        where:{
            email: email
        }
    }).then(user=>{
        if(!user[0]){
            return res.redirect('/login');
        }

        if(user[0].password === password){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
                console.log(err);
                if(user.role === 0){
                    res.redirect('/');
                }
                res.redirect('/admin');
            });
        }
        res.redirect('/login');
    }).catch(err => {
        console.log(err);
        res.redirect('/login');
    });
    };