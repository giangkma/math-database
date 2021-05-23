import express from 'express';
import rankController from '../controllers/ranks.controller';
import questionsValidation from '../validations/questions.validations';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.get(
    '/:className',
    validate(questionsValidation.paramsClassName),
    rankController.getRanksInClass,
);

export default router;
