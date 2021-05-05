const { httpStatus } = require('../config');
const userService = require('../service/user.service');

const getRanksInClass = async (req, res) => {
    try {
        const { className } = req.params;
        const allStudents = await userService.getAllStudents();
        const result = [];
        allStudents.map((student) => {
            const score = student.score[className - 1];
            if (score !== 0)
                result.push({
                    _id: student._id,
                    name: student.name,
                    score: student.score[className - 1],
                });
        });
        result.sort((a, b) => b.score - a.score);
        return res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ error: error.message });
    }
};

module.exports = {
    getRanksInClass,
};
