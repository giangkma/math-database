const addQuestion = async (req, res, next) => {
    try {
        const { className, question, correctAnswer, answer } = req.body;
        if (
            !className ||
            !question ||
            !correctAnswer ||
            !answer ||
            typeof className !== 'string' ||
            typeof correctAnswer !== 'string' ||
            typeof answer !== 'object' ||
            answer.length < 2 ||
            answer.length > 4 ||
            typeof question !== 'string'
        ) {
            res.status(400).send({ detail: 'Parameter Error' });
        } else next();
    } catch (error) {
        //error
    }
};

module.exports = { addQuestion };
