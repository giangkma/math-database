const Joi = require('joi');

const bodyQuestion = {
    body: Joi.object().keys({
        className: Joi.string().required(),
        question: Joi.string().required(),
        correctAnswer: Joi.string().required(),
        answer: Joi.array().min(2).max(4).required(),
    }),
};

const paramsId = {
    params: Joi.object().keys({
        id: Joi.string().required().length(24),
    }),
};

const checkAnswer = {
    body: Joi.object().keys({
        answer: Joi.string().required(),
    }),
};

const paramsClassName = {
    params: Joi.object().keys({
        className: Joi.number().required().min(1).max(5),
    }),
};

module.exports = {
    paramsId,
    bodyQuestion,
    checkAnswer,
    paramsClassName,
};
