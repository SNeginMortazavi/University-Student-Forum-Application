//this model is for students or registered Neu to sell their notes, books, or any related
//references for any course.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseAlgolia = require('mongoose-algolia');

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

//add plugin to Algolia
SaleSchema.plugin(mongooseAlgolia, {
    //here is the list of all attributes that we need to add from Algolia framework
    appId: 'RV2HO6Y1IJ',  //Aplication ID
    apiKey: '05312da8e017fd87d7e36f4d370cefae', //Amin API key
    indexName: 'web_development_sale_search',
    //selector is all attributes that we want to send to Algolia
    selector: '_id title description price rating author course owner created',
    populate: {
        path: 'owner course',
        select: 'name name'
    },
    defaults: {
        author: 'uknown'
    },

    debug: true //if you want to run it on production
})

var Model =  mongoose.model('Sale', SaleSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
    searchableAttributes: ['title', 'author']
});
module.exports = Model
