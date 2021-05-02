const { httpStatus } = require('../config');
const questionsService = require('../service/questions.service');
const userService = require('../service/user.service');

const getAllQuestions = async (req, res) => {
    try {
        const { className } = req.query;
        const result = await questionsService.getAllQuestions(className);
        res.status(httpStatus.SUCCESS).send({
            data: result,
            total: result.length,
        });
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
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const removeQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        await questionsService.removeQuestion(id);
        res.status(httpStatus.SUCCESS).send({});
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const checkAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;
        const userId = req.userInfo._id;
        const question = await questionsService.getQuestionById(id);

        const { className } = question;
        if (question.correctAnswer === answer) {
            const user = await userService.getUserById(userId);
            const newScore = user.score[className - 1] + 10;
            user.score[className - 1] = newScore;

            await userService.updateScore(userId, user.score);

            return res.status(httpStatus.SUCCESS).send({
                correct: true,
                score: user.score,
            });
        }
        res.status(httpStatus.SUCCESS).send({
            correct: false,
        });
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error: error.message });
    }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    editQuestion,
    removeQuestion,
    checkAnswer,
};
