const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const CourseSchema = new Schema({
    name: { type: String, unique: true },
    instructor: String,
    number: String, //course number
    description: String,
    credit: Number,
    semester: { type: Schema.Types.ObjectId, ref: 'Semester'},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    created: { type: Date, default: Date.now }
}, {
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

// CourseSchema
//     .virtual('averageRating')
//     .get(function() {
//         var rating = 0;
//         if (this.reviews.length == 0) {
//             rating = 0;
//         } else {
//             this.reviews.map(function(review) {
//                 rating += review.rating;
//         });
//             rating = rating / this.reviews.length;
//         }
//
//         return rating;
//     });

CourseSchema.plugin(deepPopulate);

module.exports = mongoose.model('Course', CourseSchema);
