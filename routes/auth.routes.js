const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');

router.post('/login', validate(authValidation.login), authController.login);

router.post(
    '/register',
    validate(authValidation.register),
    authController.register,
);

router.get('/getUserInfo', authMiddleware.isAuth, authController.getUserInfo);

module.exports = router;
