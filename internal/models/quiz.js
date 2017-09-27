var mongoose = require('mongoose');

module.exports = dbCon.model('Quizzes', new mongoose.Schema({
    title: String,
    time: Number,
    image: String,
    questions: Array,
    author: mongoose.Schema.Types.ObjectId,
    score: Array
}, {collection: 'Quizzes'}));