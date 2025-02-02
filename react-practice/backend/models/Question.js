const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: {type: String, required: true}, //Quiz Question
    options: {type: [String], required: true}, //Quiz Options
    correctAnswer: {type: String, required: true}, //Correct Answer for the Question
})

module.exports = mongoose.model('Question', QuestionSchema); //Exporting Question Model to be used in other files.