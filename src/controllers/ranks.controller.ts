import { Request, Response } from 'express';
import { IUser } from '../domain/auth.domain';
import { IRank } from '../domain/rank.domain';
import { responseAuthError, responseSuccess } from '../helpers/response';
import userService from '../service/user.service';

const getRanksInClass = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { className } = req.params;
        const allStudents: IUser[] = await userService.getAllStudents();
        const result: IRank[] = [];
        allStudents.map((student: IUser) => {
            const score = student.score[Number(className) - 1];
            if (Number(score) !== 0)
                result.push({
                    id: student.id,
                    name: student.name,
                    score: student.score[Number(className) - 1],
                });
        });
        result.sort((a: IRank, b: IRank) => Number(b.score) - Number(a.score));
        return responseSuccess(res, result)
    } catch (error) {
        return responseAuthError(res, error.message ?? error)
    }
};

export default {
    getRanksInClass,
};
