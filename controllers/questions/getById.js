const Question = require('../../models/questions');

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Question.findById(id);
        if (!result) res.status(400).send({ detail: 'Question Not Found' });
        res.status(200).send(result);
    } catch (error) {
        //error
    }
};

module.exports = { getQuestionById };
