const express = require('express');
const router = express.Router();
const questionsControllers = require('../controllers/questions.controller');
const questionsValidation = require('../validations/questions.validations');
const validate = require('../middlewares/validate');

router.get('/', questionsControllers.getAllQuestions);

router.get(
    '/:id',
    validate(questionsValidation.paramsId),
    questionsControllers.getQuestionById,
);

router.post(
    '/',
    validate(questionsValidation.bodyQuestion),
    questionsControllers.addQuestion,
);

router.put(
    '/:id',
    validate(questionsValidation.bodyQuestion),
    questionsControllers.editQuestion,
);

router.delete(
    '/:id',
    validate(questionsValidation.paramsId),
    questionsControllers.removeQuestion,
);

module.exports = router;
