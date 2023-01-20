const AuthService = require('./auth.service');

module.exports.registerUser = async (req, res, next) => {
    const data = await AuthService.addUser(req.body);
    return {
        status: 200,
        data,
        message: 'Successfully registered user'
    }
}

module.exports.resetUserPassword = async (req, res, next) => {
    const data = await AuthService.resetPassword(req.body);
    return {
        status: 200,
        data,
        message: 'Successfully changed user password'
    }
}


module.exports.loginUser = async (req, res, next) => {
    const data = await AuthService.loginUser(req.body);
    return {
        status: 200,
        data,
        message: 'Successfully loggedin user'
    }
}

module.exports.loginUserWithRefreshToken = async (req, res, next) => {
    const data = await AuthService.loginUserWithRefreshToken(req.body);
    return {
        status: 200,
        data,
        message: 'Successfully loggedin user'
    }
}

module.exports.getUser = async (req, res, next) => {
    const data = await AuthService.getUser(req.params.user_id);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved user'
    }
}