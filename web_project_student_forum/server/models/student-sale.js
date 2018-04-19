//this model is for students or registered Neu to sell their notes, books, or any related
//references for any course.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({

    owner:  { type: Schema.Types.ObjectId, ref: 'User'},
    course:  { type: Schema.Types.ObjectId, ref: 'Course'},
    author: String,
    edition: Number,
    rating: String,
    image: String,
    title: String,
    description: String,
    price: Number,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', SaleSchema);