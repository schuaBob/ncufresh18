module.exports = {
    isLoggedIn :
        function(req, res, next) {
            if (!req.isAuthenticated()) {
                return res.redirect('/auth/provider');
            }
            next();
        },
    isAdmin :
        function(req, res, next) {
            if (req.isAuthenticated() && req.user.role === 'admin')
                return next();
           return  res.redirect('/');
        }
}
