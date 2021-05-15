const Report = require('../models/report.model');

const sendReport = (payload) => {
    return new Promise((resolve, reject) => {
        const result = Report.create(payload);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getReportByQuestionId = (questionId) => {
    return new Promise((resolve, reject) => {
        const result = Report.find({ questionId });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const updateReport = (id, payload) => {
    return new Promise((resolve, reject) => {
        const result = Report.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getOneReport = (id) => {
    return new Promise((resolve, reject) => {
        const result = Report.findById(id);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getAllReports = () => {
    return new Promise((resolve, reject) => {
        const result = Report.find({});

        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const removeReport = (id) => {
    return new Promise((resolve, reject) => {
        const result = Report.findByIdAndDelete(id);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

module.exports = {
    sendReport,
    getReportByQuestionId,
    updateReport,
    getOneReport,
    getAllReports,
    removeReport,
};
