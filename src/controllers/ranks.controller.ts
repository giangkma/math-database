import { statusHTTP } from '../config';
import userService from '../service/user.service';
import { Request, Response } from 'express';
import { IUser } from '../domain/auth.domain';
import { IRank } from '../domain/rank.domain';

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
        return res.status(statusHTTP.SUCCESS).send(result);
    } catch (error) {
        return res
            .status(statusHTTP.UNAUTHORIZED)
            .send({ error: error.message });
    }
};

export default {
    getRanksInClass,
};
