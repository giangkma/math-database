import { IUser } from '../domain/auth.domain';
import User from '../models/user.model';

const getUserByUsername = (username: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const result = User.findOne({ username });
        if (!result) return reject('Người dùng không tồn tại');
        resolve(result);
    });
};

const getUserById = (id: string): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const result = User.findOne({ id: id });
        if (!result) return reject('User not found');
        resolve(result);
    });
};

const updateScore = (userId: string, score: string[]): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        const result = User.findByIdAndUpdate(
            userId,
            { score },
            {
                new: true,
            },
        );
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

const getAllStudents = (): Promise<IUser[]> => {
    return new Promise((resolve, reject) => {
        const result = User.find({ roles: 'student' });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

export default {
    getUserByUsername,
    getUserById,
    updateScore,
    getAllStudents,
};
