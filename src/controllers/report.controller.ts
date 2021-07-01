import { Request, Response } from 'express';
import { responseBadRequest, responseSuccess } from '../helpers/response';
import { RequestUser } from '../domain/common.domain';
import { IReport } from '../domain/report.domain';
import questionsService from '../service/questions.service';
import reportService from '../service/report.service';
import userService from '../service/user.service';

const sendReport = async (
    req: RequestUser,
    res: Response,
): Promise<Response> => {
    try {
        const { questionId } = req.params;
        const question = await questionsService.getQuestionById(questionId);
        if (!question) {
            throw 'Câu hỏi này không tồn tại !';
        }
        const senderId = req.userInfo.id;
        const sender = await userService.getUserById(senderId);
        const reports = (await reportService.getReportByQuestionId(
            questionId,
        )) as IReport[];
        let result;
        // reports exists => if this question has been reported before
        if (!!reports.length) {
            const payload = {
                // check sender exists
                senders: reports[0].senders.find((item) => item === sender.name)
                    ? reports[0].senders
                    : reports[0].senders.concat(sender.name),
            };
            result = await reportService.updateReport(reports[0].id, payload);
        } else {
            const payload = {
                senders: [sender.name],
                questionId,
            };
            result = await reportService.sendReport(payload);
        }
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const getOneReports = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await reportService.getOneReport(id);
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const getAllReports = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const result = await reportService.getAllReports();
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const removeReport = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await reportService.removeReport(id);
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

export default {
    sendReport,
    getAllReports,
    removeReport,
    getOneReports,
};
