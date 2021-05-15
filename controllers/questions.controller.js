const { httpStatus } = require('../config');
const questionsService = require('../service/questions.service');
const userService = require('../service/user.service');
const xlsx = require('xlsx');
const reportService = require('../service/report.service');

const getAllQuestions = async (req, res) => {
    try {
        const { query } = req;
        const result = await questionsService.getAllQuestions(query);
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await questionsService.getQuestionById(id);
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const addQuestion = async (req, res) => {
    try {
        const result = await questionsService.addQuestion(req.body);
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const editQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const newQuestion = req.body;
        const result = await questionsService.editQuestion(id, newQuestion);
        // If this question is in the list of reports => when updating, the report will be deleted
        const report = await reportService.getReportByQuestionId(id);
        if (!!report.length) {
            await reportService.removeReport(report[0].id);
        }
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const removeQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await questionsService.removeQuestion(id);
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const checkAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer, updateScore } = req.body;
        const userId = req.userInfo._id;
        const question = await questionsService.getQuestionById(id);
        if (!question) {
            throw 'Câu hỏi này không tồn tại !';
        }
        const { className } = question;
        if (question.correctAnswer === answer) {
            const user = await userService.getUserById(userId);
            if (updateScore) {
                const newScore = user.score[className - 1] + 10;
                user.score[className - 1] = newScore;
                await userService.updateScore(userId, user.score);
            }
            return res.status(httpStatus.SUCCESS).send({
                correct: true,
                score: user.score,
            });
        }
        res.status(httpStatus.SUCCESS).send({
            correct: false,
            correctAnswer: question.correctAnswer,
        });
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error });
    }
};

const addQuestionsXlsx = async (req, res) => {
    try {
        const { file } = req;
        const { id } = req.params;
        const path = `${process.cwd()}/questionFile`;
        const workbook = xlsx.readFile(`${path}/${file.filename}`);
        const sheet_name_list = workbook.SheetNames;
        const listQuestion = xlsx.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]],
        );
        const newListQuestion = [];
        let sumQuestionsInvalid = 0;

        listQuestion.map((item) => {
            const answer = [];
            const {
                answerA,
                answerB,
                answerC,
                answerD,
                question,
                correctAnswer,
                chapter,
            } = item;
            if (answerA) {
                answer.push(`${answerA}`);
            }
            if (answerB) {
                answer.push(`${answerB}`);
            }
            if (answerC) {
                answer.push(`${answerC}`);
            }
            if (answerD) {
                answer.push(`${answerD}`);
            }
            if (answer.length > 1 && correctAnswer && question) {
                item.className = id;
                item.answer = answer;
                item.chapter = chapter || undefined;
                newListQuestion.push(item);
                return;
            }
            sumQuestionsInvalid = sumQuestionsInvalid + 1;
        });
        await questionsService.addQuestionsXlsx(newListQuestion);

        res.status(httpStatus.SUCCESS).send({
            success: true,
            invalid: sumQuestionsInvalid,
            valid: newListQuestion.length,
        });
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error });
    }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    addQuestionsXlsx,
    editQuestion,
    removeQuestion,
    checkAnswer,
};
