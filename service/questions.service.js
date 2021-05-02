const Question = require('../models/question.model');

const getAllQuestions = (className) => {
    return new Promise((resolve, reject) => {
        let result;
        if (!className) {
            result = Question.find({});
        } else {
            result = Question.find({ className: className });
        }
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getQuestionById = (id) => {
    return new Promise((resolve, reject) => {
        const result = Question.findById(id);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const addQuestion = (payload) => {
    return new Promise((resolve, reject) => {
        const { className, question, correctAnswer, answer } = payload;
        const result = Question.create({
            className: className,
            question: question,
            correctAnswer: correctAnswer,
            answer: answer,
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const editQuestion = (id, payload) => {
    return new Promise((resolve, reject) => {
        const result = Question.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const removeQuestion = (id) => {
    return new Promise((resolve, reject) => {
        const result = Question.findByIdAndDelete(id);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    editQuestion,
    removeQuestion,
};
