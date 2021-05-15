const { httpStatus } = require('../config');
const jwtHelper = require('../helpers/jwt.helper');
const { roles } = require('../config');

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET ||
    'access-token-secret-example-giangdtkma.com-!@#$';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuth = async (req, res, next) => {
    try {
        // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            throw new Error();
        }
        const bearer = bearerHeader.split(' ');
        const accessToken = bearer[1];

        // Thực hiện giải mã token xem có hợp lệ hay không?
        const decoded = await jwtHelper.verifyToken(
            accessToken,
            accessTokenSecret,
        );

        // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
        req.userInfo = decoded;

        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: 'Xác thực không thành công .',
        });
    }
};

const isTeacher = async (req, res, next) => {
    try {
        const { role } = req.userInfo;
        if (role !== roles.TEACHER) {
            throw new Error();
        }
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: 'Bạn không có quyền !',
        });
    }
};

const isStudent = async (req, res, next) => {
    try {
        const { role } = req.userInfo;
        if (role !== roles.STUDENT) {
            throw new Error();
        }
        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: 'Bạn không có quyền !',
        });
    }
};

module.exports = {
    isAuth,
    isTeacher,
    isStudent,
};
