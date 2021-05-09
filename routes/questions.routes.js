const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
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
            if (
                file.mimetype ===
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                file.mimetype === 'application/xls' &&
                file.mimetype === 'application/x-dos_ms_excel' &&
                file.mimetype === 'application/x-xls'
            ) {
                return callback(new Error('Only excel are allowed.'), null);
            }
            const _filename = `${uuidv4()}_${new Date().getTime()}${path.extname(
                file.originalname,
            )}`;
            return callback(null, _filename);
        },
    }),
});

const uploadQuestionFile = uploadExcel.single('files');

router.post(
    '/:id/xlsx-create',
    authMiddleware.isTeacher,
    uploadQuestionFile,
    questionsControllers.addQuestionsXlsx,
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
