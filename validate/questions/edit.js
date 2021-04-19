const editQuestion = async (req, res, next) => {
    try {
        const { className, question, correctAnswer, answer } = req.body;
        if (req.body.id) {
            res.status(400).send({ detail: 'You could not be edit ID' });
        } else if (
            (className && typeof className !== 'string') ||
            (correctAnswer && typeof correctAnswer !== 'string') ||
            (answer && typeof answer !== 'object') ||
            (answer && answer.length < 2) ||
            (answer && answer.length > 4) ||
            (question && typeof question !== 'string')
        ) {
            res.status(400).send({ detail: 'Parameter Error' });
        } else next();
    } catch (error) {
        //error
    }
};

module.exports = { editQuestion };
