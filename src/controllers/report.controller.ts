import { statusHTTP } from '../config';
import reportService from '../service/report.service';
import questionsService from '../service/questions.service';
import { Request, Response } from 'express';
import { RequestUser } from '../domain/common.domain';
import { IReport } from '../domain/report.domain';

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
        const sender = req.userInfo.name;
        const reports = (await reportService.getReportByQuestionId(
            questionId,
        )) as IReport[];
        let result;
        // reports exists => if this question has been reported before
        if (!!reports.length) {
            const payload = {
                senders: reports[0].senders.concat(sender),
            };
            result = await reportService.updateReport(reports[0].id, payload);
        } else {
            const payload = {
                senders: [sender],
                questionId,
            };
            result = await reportService.sendReport(payload);
        }
        return res.status(statusHTTP.SUCCESS).send(result);
    } catch (error) {
        return res.status(statusHTTP.FAIL).send({ error });
    }
};

const getOneReports = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await reportService.getOneReport(id);
        return res.status(statusHTTP.SUCCESS).send(result);
    } catch (error) {
        return res.status(statusHTTP.FAIL).send({ error });
    }
};

const getAllReports = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const result = await reportService.getAllReports();
        return res.status(statusHTTP.SUCCESS).send(result);
    } catch (error) {
        return res.status(statusHTTP.FAIL).send({ error });
    }
};

const removeReport = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await reportService.removeReport(id);
        return res.status(statusHTTP.SUCCESS).send(result);
    } catch (error) {
        return res.status(statusHTTP.FAIL).send({ error });
    }
};

export default {
    sendReport,
    getAllReports,
    removeReport,
    getOneReports,
};
