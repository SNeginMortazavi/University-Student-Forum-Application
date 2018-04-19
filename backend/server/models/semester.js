const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
    name: { type: String, unique: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Semester', SemesterSchema);
