const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const questionsValidation = require('../validations/questions.validations');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth');

router.post(
    '/:questionId',
    authMiddleware.isStudent,
    validate(questionsValidation.paramsQuestionId),
    reportController.sendReport,
);

router.get('/:id', authMiddleware.isTeacher, reportController.getOneReports);

router.get('', authMiddleware.isTeacher, reportController.getAllReports);

router.delete(
    '/:id',
    authMiddleware.isTeacher,
    validate(questionsValidation.paramsId),
    reportController.removeReport,
);

module.exports = router;
