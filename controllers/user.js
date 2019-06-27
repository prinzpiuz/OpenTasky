exports.getUserDetail = (req, res, next) => {
    res.render('users', { title: "User", url1: { link: "", title: "users" }, url2: { link: "", title: "completed" } });
};