const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');

const CourseSchema = new Schema({
    name: { type: String, unique: true },
    instructor: String,
    number: String, //course number
    description: String,
    credit: Number,
    semester: { type: Schema.Types.ObjectId, ref: 'Semester'},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    created: { type: Date, default: Date.now }
});

CourseSchema.plugin(deepPopulate);
//add plugin to Algolia
CourseSchema.plugin(mongooseAlgolia, {
    //here is the list of all attributes that we need to add from Algolia framework
    appId: 'RV2HO6Y1IJ',  //Aplication ID
    apiKey: '05312da8e017fd87d7e36f4d370cefae', //Amin API key
    indexName: 'web_development_project_student_forum',
    //selector is all attributes that we want to send to Algolia
    selector: '_id name reviews description credit number instructor created',
    populate: {
        path: 'owner reviews',
        select: 'name rating'
    },
    defaults: {
        author: 'uknown'
    },

    debug: true //if you want to run it on production
})

var Model =  mongoose.model('Course', CourseSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
    searchableAttributes: ['name', 'instructor', 'number', 'credit']
});
module.exports = Model