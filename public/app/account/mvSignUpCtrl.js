/**
 * Created by HenryGau on 8/10/2014.
 */

angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth) {

    $scope.signup = function(){
        var newUserData = {
          username : $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname
        };
        if(!newUserData.username){
            mvNotifier.error("Email is empty!");
            return;
        }
        if(!newUserData.password){
            mvNotifier.error("Password is empty!");
            return;
        }
        if(!newUserData.firstName){
            mvNotifier.error("First name is empty!");
            return;
        }
        if(!newUserData.lastName){
            mvNotifier.error("Last name is empty!");
            return;
        }

        mvAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason){
            mvNotifier.error(reason);
        })
    };

    $scope.signInWFacebook = function(){
        // Call server to authenticate with facebook
        window.location = '/auth/facebook';
    };
})