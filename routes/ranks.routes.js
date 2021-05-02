const express = require('express');
const router = express.Router();
const rankController = require('../controllers/ranks.controller');
const questionsValidation = require('../validations/questions.validations');
const validate = require('../middlewares/validate');

router.get(
    '/:className',
    validate(questionsValidation.paramsClassName),
    rankController.getRanksInClass,
);

module.exports = router;
