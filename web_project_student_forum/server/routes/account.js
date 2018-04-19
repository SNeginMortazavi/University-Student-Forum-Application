const router = require('express').Router();

//encryption token library, to encrypt users information and transmit
//it between different parties in json format
const jwt = require('jsonwebtoken');

//import UserSchema we created in user.js
const User = require('../models/user');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');

//since it is just signup we just have post http method (sending data to server)
router.post('/signup', function(req, res, next) {
    var user = new User();
    user.name = req.body.name; //req.body to access data from frontend
    user.email = req.body.email;
    user.password = req.body.password;
    user.picture = user.gravatar();

    /**
     * findOne is the function in mongoose that search for one document with specific attribute
     */
    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser) {
            res.json({
                success: false,
                message: 'Student with that email is already exist'
            });

        } else {
            user.save();

            //encrypt users object in the token so the frontend can use the encrypted
            //token information and split the information
            //encrypt the token using users object, the secret key and the expiration date
            //which expires in 7 days
            var token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                message: 'You got your token',
                token: token
            });
        }

    });
});


//create login API
router.post('/login', function(req, res, next) {

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Login failed, Student not found'
            });
        } else if (user) {

            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Login failed. You entered wrong password'
                });
            } else {
                var token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });

                res.json({
                    success: true,
                    mesage: "You got your token",
                    token: token
                });
            }
        }

    });
});

router.route('/profile')
//checkJWT is the middleware, it will be run before proceeding to function
    //so it will check if token is there
    .get(checkJWT, function(req, res, next) {
        //then it will find the single document which the attribute is the _id
        User.findOne({ _id: req.decoded.user._id }, function(err, user) {
            res.json({
                success: true,
                user: user,
                message: "Successful"
            });
        });
    })
    .post(checkJWT, function(req, res, next) {
        User.findOne({ _id: req.decoded.user._id }, function(err, user) {
            if (err) return next(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;

            user.save();
            res.json({
                success: true,
                message: 'You successfully edited your profile'
            });
        });
    });

router.route('/address')
    .get(checkJWT, function(req, res, next) {
        User.findOne({ _id: req.decoded.user._id }, function(err, user) {
            res.json({
                success: true,
                address: user.address,
                message: "Successful"
            });
        });
    })
    .post(checkJWT, function(req, res, next) {
        User.findOne({ _id: req.decoded.user._id }, function(err, user) {
            if (err) return next(err);

            if (req.body.addr1) user.address.addr1 = req.body.addr1;
            if (req.body.addr2) user.address.addr2 = req.body.addr2;
            if (req.body.city) user.address.city = req.body.city;
            if (req.body.state) user.address.state = req.body.state;
            if (req.body.country) user.address.country = req.body.country;
            if (req.body.postalCode) user.address.postalCode = req.body.postalCode;

            user.save();
            res.json({
                success: true,
                message: 'You successfully edited your address'
            });
        });
    });


module.exports = router;