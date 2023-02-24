const AuthController = require('./auth.controller');
const AuthSchema = require('./auth.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = '/auth';
const routes = [
    {
        path: `${path}/register`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: AuthSchema.REGISTER_USER
        },
        handler: AuthController.registerUser
    },
    {
        path: `${path}/reset`,
        method: ROUTE_METHODS.PATCH,
        validation: {
            body: AuthSchema.RESET_USER_PASSWORD
        },
        handler: AuthController.resetUserPassword
    },
    {
        path: `${path}/login`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: AuthSchema.LOGIN_USER
        },
        handler: AuthController.loginUser
    },
    {
        path: `${path}/login/refresh_token`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: AuthSchema.LOGIN_WITH_REFRESH_TOKEN
        },
        handler: AuthController.loginUserWithRefreshToken
    },
    {
        path: `${path}/user/:user_id`,
        method: ROUTE_METHODS.GET,
        validation: {
            params: AuthSchema.GET_USER
        },
        handler: AuthController.getUser
    },
    {
        path: `${path}/verify_email`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: AuthSchema.VERIFY_EMAIL_BODY
        },
        handler: AuthController.verifyEmail
    },
    {
        path: `${path}/resend_verification_email`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: AuthSchema.RESEND_EMAIL_VERIFICATION
        },
        handler: AuthController.resendVerificationEmail
    },
]

module.exports = routes;