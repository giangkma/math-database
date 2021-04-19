const Question = require('../../models/questions');

const editQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const newQuestion = req.body;
        const result = await Question.findByIdAndUpdate(id, newQuestion, {
            new: true,
        });
        if (!result) res.status(500).send({ detail: 'Server error' });
        res.status(200).send(result);
    } catch (error) {
        //error
    }
};

module.exports = { editQuestion };
