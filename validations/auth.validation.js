const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const resgister = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().min(5),
    }),
};

module.exports = {
    login,
    resgister,
};
