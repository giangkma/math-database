const Joi = require('joi');

const question = Joi.object().keys({
    className: Joi.string().required(),
    question: Joi.string().required(),
    correctAnswer: Joi.string().required(),
    answer: Joi.array().min(2).max(4).required(),
    chapter: Joi.string().length(1),
});

const bodyQuestion = {
    body: question,
};

const bodyQuestions = {
    body: Joi.array().items(question),
};

const paramsId = {
    params: Joi.object().keys({
        id: Joi.string().required().length(24),
    }),
};

const paramsQuestionId = {
    params: Joi.object().keys({
        questionId: Joi.string().required().length(24),
    }),
};

const checkAnswer = {
    body: Joi.object().keys({
        answer: Joi.string().required(),
        updateScore: Joi.boolean().required(),
    }),
};

const paramsClassName = {
    params: Joi.object().keys({
        className: Joi.number().required().min(1).max(5),
    }),
};

module.exports = {
    paramsId,
    paramsQuestionId,
    bodyQuestion,
    bodyQuestions,
    checkAnswer,
    paramsClassName,
};
