const { roles } = require('../config');

const fillterDataUser = (user) => {
    const result = {
        _id: user._id,
        role: user.role,
        name: user.name,
        username: user.username,
    };
    if (user.role === roles.STUDENT) result.score = user.score;
    return result;
};

module.exports = {
    fillterDataUser,
};
