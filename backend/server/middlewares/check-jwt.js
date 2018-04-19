/*
this is the middleware to check if the jwt is valid or not
 token is of course from jsonwebtoken
 */

const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
    //requesting the headers of the http and check if the headers contain any token or not
    const token = req.headers["authorization"];

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {

                //since all information is already encrypted, we need to decode
                req.decoded = decoded;
                next();

            }
        });

    } else {

        res.status(403).json({
            success: false,
            message: 'No token provided'
        });

    }
}
