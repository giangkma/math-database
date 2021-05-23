import {
    IPayloadCreate,
    IPayloadUpdate,
    IReport,
} from '../domain/report.domain';
import Report from '../models/report.model';

const sendReport = async (payload: IPayloadCreate): Promise<IReport> => {
    const result = Report.create(payload);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const getReportByQuestionId = async (
    questionId: string,
): Promise<IReport[]> => {
    const result = Report.find({
        questionId,
    });
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const updateReport = async (
    id: string,
    payload: IPayloadUpdate,
): Promise<IReport> => {
    const result = Report.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const getOneReport = async (id: string): Promise<IReport> => {
    const result = Report.findById(id);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const getAllReports = async (): Promise<IReport[]> => {
    const result = Report.find({});

    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const removeReport = async (id: string): Promise<IReport> => {
    const result = Report.findByIdAndDelete(id);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

export default {
    sendReport,
    getReportByQuestionId,
    updateReport,
    getOneReport,
    getAllReports,
    removeReport,
};
