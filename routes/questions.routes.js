const express = require('express');
const router = express.Router();
const questionsControllers = require('../controllers/questions.controller');
const questionsValidation = require('../validations/questions.validations');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');

router.get('/', questionsControllers.getAllQuestions);

router.get(
    '/:id',
    validate(questionsValidation.paramsId),
    questionsControllers.getQuestionById,
);

router.post(
    '/',
    authMiddleware.isTeacher,
    validate(questionsValidation.bodyQuestion),
    questionsControllers.addQuestion,
);

router.post(
    '/:id',
    authMiddleware.isStudent,
    validate(questionsValidation.paramsId),
    validate(questionsValidation.checkAnswer),
    questionsControllers.checkAnswer,
);

router.put(
    '/:id',
    authMiddleware.isTeacher,
    validate(questionsValidation.bodyQuestion),
    questionsControllers.editQuestion,
);

router.delete(
    '/:id',
    authMiddleware.isTeacher,
    validate(questionsValidation.paramsId),
    questionsControllers.removeQuestion,
);

module.exports = router;
