exports.getUserDetail = (req, res, next) => {
    res.render('user-home', { title: "User", 
    url1: { link: "/login", title: "login" },
    url2: { link: "/logout", title: "logout" } });
};