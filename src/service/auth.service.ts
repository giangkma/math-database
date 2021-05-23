import { roles } from '../config';
import { IRegister, IUser } from '../domain/auth.domain';
import User from '../models/user.model';

const register = async (payload: IRegister): Promise<IUser> => {
    const { username, password, name } = payload;
    const result = User.create({
        name,
        username,
        password,
        role: roles.STUDENT,
    });
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

export default {
    register,
};
