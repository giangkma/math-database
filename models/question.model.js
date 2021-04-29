const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    className: {
        type: String,
        required: true,
        trim: true,
    },
    question: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    answer: {
        type: Array,
        required: true,
    },
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
