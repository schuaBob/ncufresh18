module.exports = {
    isLoggedIn :
        function(req, res, next) {
<<<<<<< HEAD
            if (req.isAuthenticated()) {
	   	return	 next();
	}
        return res.redirect('/');
=======
            if (!req.isAuthenticated()) {
                return res.redirect('/');
            }
            next();
>>>>>>> origin/smallgame
        },
    isAdmin :
        function(req, res, next) {
            if (req.isAuthenticated() && req.user.role === 'admin')
                return next();
           return  res.redirect('/');
        }
}
