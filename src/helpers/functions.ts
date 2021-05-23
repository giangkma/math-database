import { IUser } from '../domain/auth.domain';
import { roles } from '../config';

export const fillterDataUser = (user: IUser): IUser => {
    const result: any = {
        id: user.id,
        role: user.role,
        name: user.name,
        username: user.username,
    };
    if (user.role === roles.STUDENT) result.score = user.score;
    return result;
};
