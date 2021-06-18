import express from 'express';
import questionsControllers from '../controllers/questions.controller';
import questionsValidation from '../validations/questions.validations';
import { validate } from '../middlewares/validate';
import { isTeacher, isStudent } from '../middlewares/auth';

const router = express.Router();

router.get('/', questionsControllers.getAllQuestions);

router.get(
    '/:id',
    validate(questionsValidation.paramsId),
    questionsControllers.getQuestionById,
);

router.post(
    '/',
    isTeacher,
    validate(questionsValidation.bodyCreateQuestions),
    questionsControllers.addQuestion,
);

router.post(
    '/:id',
    isStudent,
    validate(questionsValidation.paramsId),
    validate(questionsValidation.checkAnswer),
    questionsControllers.checkAnswer,
);

router.post(
    '/:id/xlsx-create',
    isTeacher,
    questionsControllers.addQuestionsXlsx,
);

router.put(
    '/:id',
    isTeacher,
    validate(questionsValidation.bodyUpdateQuestion),
    questionsControllers.editQuestion,
);

router.delete(
    '/:id',
    isTeacher,
    validate(questionsValidation.paramsId),
    questionsControllers.removeQuestion,
);

export default router;
