const User = require('../models/user.model');

const resgister = (payload) => {
    return new Promise((resolve, reject) => {
        const { username, password, name } = payload;
        const result = User.create({
            name,
            username,
            password,
            role: 'student',
        });
        if (!result) return reject('Đã xảy ra lỗi !');
        resolve(result);
    });
};

module.exports = {
    resgister,
};
