/**
 * Created by HenryGau on 8/6/2014.
 */

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    FacebookStrategy = require('passport-facebook').Strategy;

exports.initialize = function(config){
    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log("Try to login:" + username + "|" + password);
            User.findOne({userName: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    console.log("found Users");
                    return done(null, user);
                } else {
                    console.log("Cannot found Users");
                    return done(null, false);
                }
            })
        }
    ));

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });

    passport.use(new FacebookStrategy({
        //pull config
        clientID : config.auth.facebookAuth.clientID,
        clientSecret : config.auth.facebookAuth.clientSecret,
        callbackURL : config.auth.facebookAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },

    // facebook send back
    function(token, refreshToken, profile, done) {
        console.log("Receive stuffs from Facebook");

        //async
        process.nextTick(function() {

            //find user in DB based on their facebook id
            User.findOne({'facebook.id' : profile.id}, function(err, user){

                // error connecting to DB
                if (err)
                    return done(err);

                // if user is found
                if (user) {
                    return done(null, user);
                } else {
                    //no user is found, create them
                    var newUser = new User();

                    //set all fields
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    // save our user to the DB
                    newUser.save(function(err){
                        if(err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};