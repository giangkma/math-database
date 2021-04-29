const { httpStatus } = require('../config');
const questionsService = require('../service/questions.service');

const getAllQuestions = async (req, res) => {
    const { className } = req.query;
    const result = await questionsService.getAllQuestions(className);
    res.status(httpStatus.SUCESS).send({
        data: result,
        total: result.length,
    });
};

const getQuestionById = async (req, res) => {
    const { id } = req.params;
    const result = await questionsService.getQuestionById(id);
    res.status(httpStatus.SUCESS).send(result);
};

const addQuestion = async (req, res) => {
    try {
        const result = await questionsService.addQuestion(req.body);
        res.status(httpStatus.SUCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send(error);
    }
};

const editQuestion = async (req, res) => {
    const { id } = req.params;
    const newQuestion = req.body;
    const result = await questionsService.editQuestion(id, newQuestion);
    res.status(httpStatus.SUCESS).send(result);
};

const removeQuestion = async (req, res) => {
    const { id } = req.params;
    await questionsService.removeQuestion(id);
    res.status(httpStatus.SUCESS).send({});
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    editQuestion,
    removeQuestion,
};
