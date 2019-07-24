const User = require('../models/user');

exports.getLogin = (req, res, next) =>{
    res.render('auth/login',
        {title: 'Login',
        url1: {
            link: "/checkEmail",
            title: "Register"
        }
    }
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

exports.getCheckEmail = (req, res, next) => {
        res.render('auth/emailCheck', {
          title: 'EmailCheck'
        });
      };

exports.postCheckEmail = (req, res, next) => {
    const email = req.body['email'];
    User.findAll({
        where:{
            email: email
        }
    }).then(user=>{
        if(!user[0]){
            return res.redirect('/checkEmail');
        }
        if(user[0].status === 1){
            return res.redirect('/checkEmail');
        }
        return res.render('auth/signup', {
            title: 'Complete Signup',
            userId: user[0].id
          });
    });

};

exports.postSignup = (req, res, next) => {
    const name = req.body['name'];
    const password1 = req.body['password1'];
    const password2 = req.body['password2'];
    const userID = req.body['id'];
    if(password1===password2){
        User.findByPk(userID).then(user=>{
            user.name = name;
            user.password = password1;
            return user.save();
        }).then(res.redirect('/'))
    }
    return res.render('auth/signup', {
        title: 'Complete Signup',
        userId: userID
      });   
};