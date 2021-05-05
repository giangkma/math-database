const User = require('../models/user.model');

const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const result = User.findOne({ username });
        if (!result) return reject('Người dùng không tồn tại');
        resolve(result);
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const result = User.findOne({ _id: id });
        if (!result) return reject('User not found');
        resolve(result);
    });
};

const updateScore = (userId, score) => {
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

const getAllStudents = () => {
    return new Promise((resolve, reject) => {
        const result = User.find({ role: 'student' });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

module.exports = {
    getUserByUsername,
    getUserById,
    updateScore,
    getAllStudents,
};
