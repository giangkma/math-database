import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { v4 } from 'uuid';
import path from 'path';
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

const uploadExcel = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const path = `${process.cwd()}/questionFile`;
            try {
                fs.lstatSync(path).isDirectory();
            } catch (e) {
                if (e.code === 'ENOENT') {
                    fs.mkdirSync(path, { recursive: true });
                } else {
                    throw e;
                }
            }
            callback(null, path);
        },
        filename: (req, file, callback) => {
            console.log(file);
            if (
                file.mimetype ===
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.mimetype === 'application/xls' ||
                file.mimetype === 'application/x-dos_ms_excel' ||
                file.mimetype === 'application/x-xls'
            ) {
                return callback(new Error('Only excel are allowed.'), null);
            }
            const _filename = `${v4()}_${new Date().getTime()}${path.extname(
                file.originalname,
            )}`;
            return callback(null, _filename);
        },
    }),
});

const uploadQuestionFile = uploadExcel.single('files');

router.post(
    '/:id/xlsx-create',
    isTeacher,
    uploadQuestionFile,
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
