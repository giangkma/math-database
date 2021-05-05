const jwtHelper = require('../helpers/jwt.helper');
const { httpStatus } = require('../config');
const authService = require('../service/auth.service');
const userService = require('../service/user.service');
const { fillterDataUser } = require('../helpers/functions');

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
        if (!user) throw new Error('Sai tên đăng nhập !');
        if (!(await user.isPasswordMatch(password))) {
            throw new Error('Mật khẩu không đúng !');
        }
        const dataUserFilter = fillterDataUser(user);
        const accessToken = await jwtHelper.generateToken(
            dataUserFilter,
            accessTokenSecret,
            accessTokenLife,
        );
        return res.status(httpStatus.SUCCESS).send({
            accessToken,
            information: dataUserFilter,
        });
    } catch (error) {
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send({ error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        const dataUserFilter = fillterDataUser(result);
        const accessToken = await jwtHelper.generateToken(
            dataUserFilter,
            accessTokenSecret,
            accessTokenLife,
        );
        return res.status(httpStatus.SUCCESS).send({
            accessToken,
            information: dataUserFilter,
        });
    } catch (error) {
        return res.status(httpStatus.FAIL).send({ error });
    }
};

const getUserInfo = async (req, res) => {
    try {
        const { _id } = req.userInfo;
        const user = await userService.getUserById(_id);
        const result = fillterDataUser(user);
        return res.status(httpStatus.SUCCESS).send(result);
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send({ error });
    }
};

module.exports = {
    login,
    register,
    getUserInfo,
};
