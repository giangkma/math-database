import { Request, Response } from 'express';
import { IUser } from '../domain/auth.domain';
import { RequestUser } from '../domain/common.domain';
import { fillterDataUser } from '../helpers/functions';
import { generateToken } from '../helpers/jwt';
import { responseAuthError, responseSuccess } from '../helpers/response';
import authService from '../service/auth.service';
import userService from '../service/user.service';


// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '3d';

const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET ||
    'access-token-secret-example-giangdtkma.com-!@#$';

/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user: any = await userService.getUserByUsername(username);
        if (!user) throw new Error('Sai tên đăng nhập !');
        if (!(await user.isPasswordMatch(password))) {
            throw new Error('Mật khẩu không đúng !');
        }
        const dataUserFilter = fillterDataUser(user);
        const accessToken = await generateToken(
            dataUserFilter,
            accessTokenSecret,
            accessTokenLife,
        );
        responseSuccess(res, {
            accessToken,
            information: dataUserFilter,
        });
    } catch (error) {
        responseAuthError(res, error.message ?? error)
    }
};

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const result: IUser = await authService.register(req.body);
        const dataUserFilter = fillterDataUser(result);
        const accessToken = await generateToken(
            dataUserFilter,
            accessTokenSecret,
            accessTokenLife,
        );
        responseSuccess(res, {
            accessToken,
            information: dataUserFilter,
        });
    } catch (error) {
        responseAuthError(res, error.message ?? error)
    }
};

const getUserInfo = async (
    req: RequestUser,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.userInfo;
        const user: IUser = await userService.getUserById(id);
        const result: IUser = fillterDataUser(user);
        responseSuccess(res, result);
    } catch (error) {
        responseAuthError(res, error.message ?? error)
    }
};

export default {
    login,
    register,
    getUserInfo,
};
