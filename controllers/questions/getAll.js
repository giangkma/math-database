const Question = require('../../models/questions');

const getAllQuestions = async (req, res) => {
    try {
        const { className } = req.query;
        let result = null;
        if (!className) {
            result = await Question.find({});
        } else {
            result = await Question.find({ className });
        }
        res.status(200).send(result);
    } catch (error) {
        //error
    }
};

module.exports = { getAllQuestions };
