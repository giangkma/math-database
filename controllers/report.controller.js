const { httpStatus } = require('../config');
const reportService = require('../service/report.service');
const questionsService = require('../service/questions.service');

const sendReport = async (req, res) => {
    try {
        const { questionId } = req.params;
        const question = await questionsService.getQuestionById(questionId);
        if (!question) {
            throw 'Câu hỏi này không tồn tại !';
        }
        const sender = req.userInfo.name;
        const report = await reportService.getReportByQuestionId(questionId);
        let result;
        // report exists => if this question has been reported before
        if (!!report.length) {
            const report = report[0];
            const payload = {
                senders: report.senders.concat(sender),
            };
            result = await reportService.updateReport(report.id, payload);
        } else {
            const payload = {
                senders: [sender],
                questionId,
            };
            result = await reportService.sendReport(payload);
        }
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error });
    }
};

const getOneReports = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await reportService.getOneReport(id);
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error });
    }
};

const getAllReports = async (req, res) => {
    try {
        const result = await reportService.getAllReports();
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error });
    }
};

const removeReport = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await reportService.removeReport(id);
        res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        res.status(httpStatus.FAIL).send({ error });
    }
};

module.exports = {
    sendReport,
    getAllReports,
    removeReport,
    getOneReports,
};
