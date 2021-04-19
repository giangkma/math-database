const getQuestionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (id.length !== 24) {
            res.status(400).send({ detail: 'Id not valid' });
        } else next();
    } catch (error) {
        //error
    }
};

module.exports = { getQuestionById };
