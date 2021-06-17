import { Request, Response } from 'express';
import xlsx from 'xlsx';
import { IUser } from '../domain/auth.domain';
import { RequestUser } from '../domain/common.domain';
import { IQuestion } from '../domain/question.domain';
import { responseBadRequest, responseSuccess } from '../helpers/response';
import questionsService from '../service/questions.service';
import reportService from '../service/report.service';
import userService from '../service/user.service';

const getAllQuestions = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { query } = req;
        if (query.chapter === 'all') delete query.chapter;
        const result = await questionsService.getAllQuestions(query);
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const getQuestionById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await questionsService.getQuestionById(id);
        if (!result) {
            throw 'Câu hỏi này không tồn tại !';
        }
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const addQuestion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await questionsService.addQuestion(req.body);
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const editQuestion = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const newQuestion = req.body;
        const result = await questionsService.editQuestion(id, newQuestion);
        // If this question is in the list of reports => when updating, the report will be deleted
        const report: any = await reportService.getReportByQuestionId(id);
        if (!!report.length) {
            await reportService.removeReport(report[0].id);
        }
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const removeQuestion = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const result = await questionsService.removeQuestion(id);
        return responseSuccess(res, result);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const checkAnswer = async (
    req: RequestUser,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const { answer, updateScore } = req.body;
        const userId = req.userInfo.id;
        const question: IQuestion = await questionsService.getQuestionById(id);
        if (!question) {
            throw 'Câu hỏi này không tồn tại !';
        }
        const { className } = question;
        if (question.correctAnswer === answer) {
            const user: IUser = await userService.getUserById(userId);
            if (updateScore) {
                const newScore = user.score[Number(className) - 1] + 10;
                user.score[Number(className) - 1] = newScore;
                await userService.updateScore(userId, user.score);
            }
            return responseSuccess(res, {
                correct: true,
                score: user.score,
            });
        }
        return responseSuccess(res, {
            correct: false,
            correctAnswer: question.correctAnswer,
        });
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

const addQuestionsXlsx = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { file } = req;
        const { id } = req.params;
        const path = `${process.cwd()}/questionFile`;
        const workbook = xlsx.readFile(`${path}/${file.filename}`);
        const sheet_name_list = workbook.SheetNames;
        const listQuestion = xlsx.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]],
        );
        const newListQuestion: IQuestion[] = [];
        let sumQuestionsInvalid = 0;

        listQuestion.map((item: any) => {
            const answer = [];
            const {
                answerA,
                answerB,
                answerC,
                answerD,
                question,
                correctAnswer,
                chapter,
            } = item;
            if (answerA) {
                answer.push(`${answerA}`);
            }
            if (answerB) {
                answer.push(`${answerB}`);
            }
            if (answerC) {
                answer.push(`${answerC}`);
            }
            if (answerD) {
                answer.push(`${answerD}`);
            }
            if (answer.length > 1 && correctAnswer && question) {
                item.className = id;
                item.answer = answer;
                item.chapter = chapter || undefined;
                newListQuestion.push(item);
                return;
            }
            sumQuestionsInvalid = sumQuestionsInvalid + 1;
        });
        await questionsService.addQuestionsXlsx(newListQuestion);

        return responseSuccess(res, {
            success: true,
            invalid: sumQuestionsInvalid,
            valid: newListQuestion.length,
        });
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

export default {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    addQuestionsXlsx,
    editQuestion,
    removeQuestion,
    checkAnswer,
};
