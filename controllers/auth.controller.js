const jwtHelper = require('../helpers/jwt.helper');
const { httpStatus } = require('../config');
const authService = require('../service/auth.service');
const userService = require('../service/user.service');

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
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.getUserByUsername(username);
        if (!(await user.isPasswordMatch(password))) {
            throw new Error('Mật khẩu không đúng !');
        }
        const accessToken = await jwtHelper.generateToken(
            user,
            accessTokenSecret,
            accessTokenLife,
        );
        return res.status(httpStatus.SUCCESS).send({ accessToken });
    } catch (error) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ error: error.message });
    }
};

const resgister = async (req, res) => {
    try {
        const result = await authService.resgister(req.body);

        return res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        return res.status(httpStatus.FAIL).send({ error });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const { _id } = req.userInfo;
        const user = await userService.getUserById(_id);
        return res.status(httpStatus.SUCCESS).send({
            _id: user._id,
            role: user.role,
            name: user.name,
            score: user.score,
            username: user.username,
        });
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send({ error });
    }
};

module.exports = {
    login,
    resgister,
    getUserInfo,
};
