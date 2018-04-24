const router = require('express').Router();
const Sale = require('../models/student-sale');
const Course = require('../models/course');
const async = require('async');
const checkJWT = require('../middlewares/check-jwt');

const aws = require('aws-sdk'); //sdk is the library to communicate with services (s3)
const multer = require('multer'); //multer is the library to upload images
const multerS3 = require('multer-s3'); //multers3 is the library to upload directly to s3
const s3 = new aws.S3({ accessKeyId: "AKIAJUUZP244LYHO6O7Q", secretAccessKey: "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" });


//creating storage on s3
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'webprojectcs5610',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        //key is the name of the uploaded file
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

//find all the books or notes belongs to this student as owner
router.route('/sale')
    .get(checkJWT, function(req, res, next) {
        Sale.find({ owner: req.decoded.user._id })
            .populate('owner') //with populate we get all information of owner
            .populate('course') //without populate it just show the id for course and owner
            .exec(function(err, sales){ //
                if (sales) {
                    res.json({
                        success: true,
                        message: "Sales",
                        sales: sales
                    });
                }
            });
    })

    /* This http request is for students or any registered neu to sell their
    * book, notes or any related course material for specific course.
    * since we have multiple middleware we should use array
    * first check the token, if the token is valid, then the user can upload
    * so first middleware is checkJWT and the second one is upload image to s3
    */
    .post([checkJWT, upload.single('sale_picture')], function(req, res, next) {
        console.log(upload);
        console.log(req.file);
        var sale = new Sale();
        sale.owner = req.decoded.user._id;
        sale.course = req.body.courseId;
        sale.title = req.body.title;
        sale.author = req.body.author;
        sale.price = req.body.price;
        sale.edition = req.body.edition;
        sale.rating = req.body.rating;
        sale.description = req.body.description;
        sale.image = req.file.location;
        sale.save();
        res.json({
            success: true,
            message: 'Successfully Added the student book/note/...'
        });
    });

/*find all the books or notes for specific course
each course can have several enrolled students in the past, that they
want to sell their notes and books.
*/
router.get('/sales/:id',function(req, res, next) {
        Sale.find({ course: req.params.id })
            .populate('owner')
            .populate('course')
            .exec(function(err, sales){
                if (sales) {
                    res.json({
                        success: true,
                        message: "Sales",
                        sales: sales
                    });
                }
            });
    })


/*
To find all sales for any course and any students posted
 */
router.get('/sales', function(req, res, next) {
    // const perPage = 10;
    // const page = req.query.page;
    async.parallel([
        function(callback) {
            Sale.count({}, function(err, count) {
                var totalSales = count;
                callback(err, totalSales);
            });
        },
        function(callback) {
            Sale.find({})
                // .skip(perPage * page)
                // .limit(perPage)
                .populate('owner')
                .populate('course')
                .exec(function(err, sales) {
                    if(err) return next(err);
                    callback(err, sales);
                });
        }
    ], function(err, results) {
        var totalSales = results[0];
        var sales = results[1];

        res.json({
            success: true,
            message: 'sales',
            saless: sales,
            totalCourses: totalSales,
            // pages: Math.ceil(totalSales / perPage)
        });
    });

});


module.exports = router;
