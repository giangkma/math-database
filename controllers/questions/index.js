const { getAllQuestions } = require('./getAll');
const { addQuestion } = require('./add');
const { editQuestion } = require('./edit');
const { getQuestionById } = require('./getById');
const { removeQuestion } = require('./remove');

module.exports = {
    getAllQuestions,
    addQuestion,
    editQuestion,
    getQuestionById,
    removeQuestion,
};
