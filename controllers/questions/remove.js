const Question = require('../../models/questions');

const removeQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Question.findByIdAndDelete(id);
        if (!result) res.status(500).send({ detail: 'Server error' });
        res.status(200).send({});
    } catch (error) {
        //error
    }
};

module.exports = { removeQuestion };
