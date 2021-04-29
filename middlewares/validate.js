const Joi = require('joi');
const pick = require('../helpers/pick');
const { httpStatus } = require('../config');

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);

    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(', ');
        return next(res.status(httpStatus.FAIL).send({ error: errorMessage }));
    }
    return next();
};

module.exports = validate;
