/**
 * Created by HenryGau on 8/4/2014.
 */

var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

    // To create a new user
    app.post('/api/users', users.createUser);

    // To update current user profile
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseById);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        console.log("Logging out", req, " Out...", req.logout);
        req.logout();
        res.end();
    });

    app.all('/api/*', function(req, res){
        res.send(404);
    });

    // FACEBOOK auth
    app.get('/auth/facebook', auth.authenticateFacebook);
    // handle the callback 
    app.get('/auth/facebook/callback', auth.authenticateFacebookCallback);

    app.get('*', function (req, res) {
        console.log("Not service call, rendering index");
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
