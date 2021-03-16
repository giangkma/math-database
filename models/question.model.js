const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    className: String,
    question: String,
    correctAnswer: String,
    answer: Array,
});

const Question = mongoose.model("Question", QuestionSchema, "questions");

module.exports = Question;
