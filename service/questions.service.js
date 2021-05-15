const Question = require('../models/question.model');

const getAllQuestions = (query) => {
    return new Promise((resolve, reject) => {
        const result = Question.find(query);
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

const addQuestion = (arrayQuestion) => {
    return new Promise((resolve, reject) => {
        const result = [];
        arrayQuestion.map((item) => {
            const { className, question, correctAnswer, answer, chapter } =
                item;
            const res = Question.create({
                className: className,
                question: question,
                correctAnswer: correctAnswer,
                answer: answer,
                chapter: chapter || undefined,
            });
            result.push(res);
        });
        if (result.length === 0)
            return reject('Lỗi! Hãy kiểm tra lại các câu hỏi !');
        resolve({ success: true, total: result.length });
    });
};

const addQuestionsXlsx = (arrayQuestion) => {
    return new Promise((resolve, reject) => {
        const result = [];
        arrayQuestion.map((question) => {
            const res = Question.create({
                question: question.question,
                answer: question.answer,
                correctAnswer: question.correctAnswer,
                className: question.className,
                chapter: question.chapter || undefined,
            });
            result.push(res);
        });
        if (result.length === 0)
            return reject('Lỗi! Hãy kiểm tra lại các câu hỏi !');
        resolve({ success: true, total: result.length });
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
    addQuestionsXlsx,
    editQuestion,
    removeQuestion,
};
