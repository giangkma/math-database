import express from 'express';
import reportController from '../controllers/report.controller';
import questionsValidation from '../validations/questions.validations';
import { validate } from '../middlewares/validate';
import { isStudent, isTeacher } from '../middlewares/auth';

const router = express.Router();

router.post(
    '/:questionId',
    isStudent,
    validate(questionsValidation.paramsQuestionId),
    reportController.sendReport,
);

router.get('/:id', isTeacher, reportController.getOneReports);

router.get('', isTeacher, reportController.getAllReports);

router.delete(
    '/:id',
    isTeacher,
    validate(questionsValidation.paramsId),
    reportController.removeReport,
);

export default router;
