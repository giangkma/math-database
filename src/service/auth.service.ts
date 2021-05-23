import { roles } from '../config';
import { IRegister, IUser } from '../domain/auth.domain';
import User from '../models/user.model';

const register = (payload: IRegister): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const { username, password, name } = payload;
        const result = User.create({
            name,
            username,
            password,
            role: roles.STUDENT,
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

export default {
    register,
};
