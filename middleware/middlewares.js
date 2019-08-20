exports.isLogged = (req, res, next) => {

    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.session.user[0].role === 0) {
        return res.redirect('/login');
    }
    next();
}

