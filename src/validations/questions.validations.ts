import Joi from 'joi';

const createQuestion = Joi.object().keys({
    className: Joi.string().required(),
    question: Joi.string().required(),
    correctAnswer: Joi.string().required(),
    answer: Joi.array().min(2).max(4).required(),
    chapter: Joi.string().length(1),
});

const bodyUpdateQuestion = {
    body: Joi.object().keys({
        className: Joi.string(),
        question: Joi.string(),
        correctAnswer: Joi.string(),
        answer: Joi.array().min(2).max(4),
        chapter: Joi.string().length(1),
    }),
};

const bodyCreateQuestion = {
    body: createQuestion,
};

const bodyCreateQuestions = {
    body: Joi.array().items(createQuestion),
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

export default {
    paramsClassName,
    checkAnswer,
    paramsQuestionId,
    paramsId,
    bodyCreateQuestions,
    bodyUpdateQuestion,
    bodyCreateQuestion,
};
