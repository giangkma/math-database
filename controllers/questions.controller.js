const Question = require("../models/question.model");

module.exports.getAll = async (req, res) => {
    const { className } = req.query;
    let result = null;
    if (!className) {
        result = await Question.find({});
    } else {
        result = await Question.find({ className: className });
    }
    console.log(result);
    res.status(200).send(result);
};
module.exports.getById = async (req, res) => {
    const { id } = req.params;
    const result = await Question.findById(id);
    if (!result) res.status(400).send({ detail: "Question Not Found" });
    res.status(200).send(result);
};

module.exports.addQuestion = async (req, res) => {
    const { className, question, correctAnswer, answer } = req.body;
    const result = await Question.create({
        className: className,
        question: question,
        correctAnswer: correctAnswer,
        answer: answer,
    });
    if (!result) res.status(500).send({ detail: "Server error" });
    res.status(200).send(result);
};
module.exports.editQuestion = async (req, res) => {
    const { id } = req.params;
    const newQuestion = req.body;
    const result = await Question.findByIdAndUpdate(id, newQuestion, {
        new: true,
    });
    if (!result) res.status(500).send({ detail: "Server error" });
    res.status(200).send(result);
};
module.exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    const result = await Question.findByIdAndDelete(id);
    if (!result) res.status(500).send({ detail: "Server error" });
    res.status(200).send({});
};
