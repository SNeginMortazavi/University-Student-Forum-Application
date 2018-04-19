const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({

    course: { type: Schema.Types.ObjectId, ref: 'Course'},
    owner:  { type: Schema.Types.ObjectId, ref: 'User'},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
    image: String,
    title: String,
    description: String,
    price: Number,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);


