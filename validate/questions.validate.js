module.exports.findQuestionById = (req, res, next) => {
    const { id } = req.params;
    if (id.length !== 24) {
        res.status(400).send({ detail: "Id not valid" });
    } else next();
};

module.exports.addQuestion = (req, res, next) => {
    const { className, question, correctAnswer, answer } = req.body;
    if (
        !className ||
        !question ||
        !correctAnswer ||
        !answer ||
        typeof className !== "string" ||
        typeof correctAnswer !== "string" ||
        typeof answer !== "object" ||
        answer.length < 2 ||
        answer.length > 4 ||
        typeof question !== "string"
    ) {
        res.status(400).send({ detail: "Parameter Error" });
    } else next();
};

module.exports.editQuestion = (req, res, next) => {
    const { className, question, correctAnswer, answer } = req.body;
    if (req.body.id) {
        res.status(400).send({ detail: "You could not be edit ID" });
    } else if (
        (className && typeof className !== "string") ||
        (correctAnswer && typeof correctAnswer !== "string") ||
        (answer && typeof answer !== "object") ||
        (answer && answer.length < 2) ||
        (answer && answer.length > 4) ||
        (question && typeof question !== "string")
    ) {
        res.status(400).send({ detail: "Parameter Error" });
    } else next();
};
