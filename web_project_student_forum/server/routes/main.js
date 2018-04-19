/*
this file has all routes for courses, books and semesters.
 */

const router = require('express').Router();
const async = require('async');

const Semester = require('../models/semester');
const Course = require('../models/course');
const Review = require('../models/review');
const checkJWT = require('../middlewares/check-jwt');


router.route('/semesters')
    .get(function(req, res, next) {
        //search for every single semester
        Semester.find({}, function(err, semesters) {
            res.json({
                success: true,
                message: "Success",
                semesters: semesters
            })
        })
    })
    .post(function(req, res, next) {
        var semester = new Semester();
        semester.name = req.body.name;
        semester.save();
        res.json({
            success: true,
            message: "Successful"
        });
    });


router.route('/course')
    .get(function(req, res, next) {
        //search for every single course
        Course.find({}, function(err, courses) {
            res.json({
                success: true,
                message: "Success",
                courses: courses
            })
        })
    })

    .post(function(req, res, next) {
        var course = new Course();
        // course.name = req.body.course;
        course.name = req.body.name;
        course.instructor = req.body.instructor;
        course.description = req.body.description;
        course.number = req.body.number;
        course.credit = req.body.credit;
        course.semester = req.body.semesterId;

        course.save();
        res.json({
            success: true,
            message: "Successfully added the course"
        });
    });

router.get('/courses', function(req, res, next) {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
        function(callback) {
            Course.count({}, function(err, count) {
                var totalCourses = count;
                callback(err, totalCourses);
        });
    },
    function(callback) {
        Course.find({})
            .skip(perPage * page)
            .limit(perPage)
            .populate('semester')
            .exec(function(err, courses){
                if(err) return next(err);
                callback(err, courses);
            });
    }
], function(err, results) {
    var totalCourses = results[0];
    var courses = results[1];

    res.json({
        success: true,
        message: 'semester',
        courses: courses,
        totalCourses: totalCourses,
        pages: Math.ceil(totalCourses / perPage)
    });
    });

});

/*
* this function get all the courses in specific semester
* we also did pagination, limiting amount of data getting from mongoDB
* forexample if we have 3000 books in database, it is not efficient, because
* we will get this much data, instead we want to get specific amount of
* book, 10, per API, so it will be 300 pages
*/
router.get('/semesters/:id', function(req, res, next) {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
        function(callback) {
            Course.count({semester: req.params.id}, function(err, count) {
                var totalCourses = count;
                callback(err, totalCourses);
            });
        },
        function(callback) {
            Course.find({semester: req.params.id})
                .skip(perPage * page)
                .limit(perPage)
                .populate('semester')
                .populate('reviews')
                .exec(function(err, courses) {
                    if(err) return next(err);
                    callback(err, courses);
                });
        }
    ], function(err, results) {
        var totalCourses = results[0];
        var courses = results[1];

        res.json({
            success: true,
            message: 'course',
            courses: courses,
            totalCourses: totalCourses,
            pages: Math.ceil(totalCourses / perPage)
        });
    });

});

/*how to get course based on its own id
*findById only returnes one course
* */
router.get('/course/:id', function(req, res, next) {
    Course.findById({ _id: req.params.id })
        .populate('course')
        .populate('semester')
        .deepPopulate('reviews.owner') //use deepPopulate to get the complete information about owner
        .exec(function(err, course) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Course is not found'
                });
            } else {
                if (course) {
                    res.json({
                        success: true,
                        course: course
                    });
                }
            }
        });
});


router.post('/review', checkJWT, function(req, res, next) {
    //here we use async waterfall because the second function depends
    //on the first one
    async.waterfall([
        //this function simply find the single book,
        //actually the frontend will send this bookId
        function(callback) {
            Course.findOne({ _id: req.body.courseId}, function(err, course) {
               //if course does exist then it will go and trigger the callback function
                if (course) {
                    callback(err, course);
                }
            });
        },

        //created the new review function on this specific book
        function(course) {
            var review = new Review();
            review.owner = req.decoded.user._id;

            if (req.body.title) review.title = req.body.title;
            if (req.body.description) review.description = req.body.description;
            review.rating = req.body.rating;

            course.reviews.push(review._id);
            course.save();
            review.save();
            res.json({
                success: true,
                message: "Successfully added the review"
            });
        }
    ]);
});

module.exports = router;


