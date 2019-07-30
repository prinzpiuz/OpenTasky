exports.getUserDetail = (req, res, next) => {
    res.render('user-home', { title: "User", 
    url1: { link: "/login", title: "login" }});
};