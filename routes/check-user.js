module.exports = {
    isLoggedIn :
        function(req, res, next) {
            if (req.isAuthenticated())
                res.redirect('/');
            return next();
        },
    isAdmin :
        function(req, res, next) {
            if (req.isAuthenticated() && req.user.role === 'admin')
                return next();
            res.redirect('/');
        }
}
