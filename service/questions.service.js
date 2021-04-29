const ApiError = require('../helpers/ApiError');
const Question = require('../models/question.model');
const { httpStatus } = require('../config');

const getAllQuestions = async (className) => {
    let result;
    if (!className) {
        result = await Question.find({});
    } else {
        result = await Question.find({ className: className });
    }
    if (!result) {
        throw new ApiError(httpStatus.FAIL, 'Server error');
    }
    return result;
};

const getQuestionById = async (id) => {
    const result = await Question.findById(id);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    return result;
};

const addQuestion = async (payload) => {
    const { className, question, correctAnswer, answer } = payload;
    const result = await Question.create({
        className: className,
        question: question,
        correctAnswer: correctAnswer,
        answer: answer,
    });
    if (!result) {
        throw new ApiError(httpStatus.FAIL, 'Server error');
    }
    return result;
};

const editQuestion = async (id, payload) => {
    const result = await Question.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError(httpStatus.FAIL, 'Server error');
    }
    return result;
};

const removeQuestion = async (id) => {
    const result = await Question.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(httpStatus.FAIL, 'Server error');
    }
    return result;
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    editQuestion,
    removeQuestion,
};
