/**
 * Created by HenryGau on 8/4/2014.
 */

 var path = require('path');
 var rootPath = path.normalize(__dirname + '/../../');
 module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030,

        auth: {
            facebookAuth : {
                clientID : <add ur id>,
                clientSecret : <add ur secret>,
                callbackURL : 'http://localhost:3030/auth/facebook/callback'
            }
        }
    },

    production: {
        rootPath: rootPath,
        db: 'mongodb://<username>:<password>@<mongodbaddress>/multivision_henry',
        port: process.env.PORT || 80,

        auth:{
            facebookAuth : {
                'clientID' : <add ur id>,
                'clientSecret' : <add ur secret>,
                'callbackURL' : 'http://localhost:3030/auth/facebook/callback'
            }
        }
    }
}
