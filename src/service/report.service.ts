import {
    IPayloadCreate,
    IPayloadUpdate,
    IReport,
} from '../domain/report.domain';
import Report from '../models/report.model';

const sendReport = (payload: IPayloadCreate): Promise<IReport> => {
    return new Promise((resolve, reject) => {
        const result = Report.create(payload);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getReportByQuestionId = (questionId: string): Promise<IReport[]> => {
    return new Promise((resolve, reject) => {
        const result = Report.find({
            questionId,
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const updateReport = (
    id: string,
    payload: IPayloadUpdate,
): Promise<IReport> => {
    return new Promise((resolve, reject) => {
        const result = Report.findByIdAndUpdate(id, payload, {
            new: true,
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getOneReport = (id: string): Promise<IReport> => {
    return new Promise((resolve, reject) => {
        const result = Report.findById(id);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getAllReports = (): Promise<IReport[]> => {
    return new Promise((resolve, reject) => {
        const result = Report.find({});

        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const removeReport = (id: string): Promise<IReport> => {
    return new Promise((resolve, reject) => {
        const result = Report.findByIdAndDelete(id);
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

export default {
    sendReport,
    getReportByQuestionId,
    updateReport,
    getOneReport,
    getAllReports,
    removeReport,
};
