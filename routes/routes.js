var Contact = require('../models/contacts');
module.exports = function(app, passport) {
    //Hompage
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    //local-login
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login',{
        successRedirect : './profile',
        failureRedirect : './login',
        failureFlash : true
    }));

    //local-signup
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : './signup',
        failureFlash : true
    }));

    //profile
    app.get('/profile', isLoggedIn, function(req, res) {
        Contact.find({
            userId: req.user._id
        }, (err, contacts) => {
            if(err){
                return res.status(404).json({
                    message: err,
                    success: false
                });
            }
            else {
                res.render('profile.ejs', {
                    contacts: contacts,
                    user: req.user
                });
            }
        });

    });

    //logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    //local authorization
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/connect/local',
        failureFlash : true
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}