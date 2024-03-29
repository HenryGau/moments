/**
 * Created by HenryGau on 8/6/2014.
 */

var passport = require('passport');

exports.authenticate = function(req, res, next) {
    // To lower case all username
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({success: false})
        }
        req.logIn(user, function(err){
            if(err) { return next(err); }
            // We set user: user here!
            res.send({success: true, user: user});
        })
    });
    auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
}

exports.requiresRole = function(role) {
    return function(req, res, next){
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
}

exports.authenticateFacebook = function(req, res, next) {
    var auth = passport.authenticate('facebook', {scope : 'email'});
    auth(req, res, next);
}

exports.authenticateFacebookCallback = function(req, res, next) {
    var auth = passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
    });
    auth(req, res, next);
}