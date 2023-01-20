const AuthModel = require('./auth.model');
const CryptoTool = require('../../template/tools/crypto.tool');
const JwtTool = require('../../template/tools/jwt.tool');
const HTTP_RESPONSES = require('../../template/contants/http-responses');

module.exports.addUser = async(params) => {
    params.password = await CryptoTool.encrypt(params.password);
    const insert_response = await AuthModel.insertUser(params);
    return this.getUser(insert_response?.insertedId);
}

module.exports.resetPassword = async(params) => {
    const user = await AuthModel.filterUser({ email: params.email });
    if (!user) {
        throw HTTP_RESPONSES.NOT_FOUND('User', params.email);
    }
    params.password = await CryptoTool.encrypt(params.password);
    const update_response = await AuthModel.updateUser(user._id, params);
    if (update_response.modifiedCount === 0) {
        throw HTTP_RESPONSES.INTERNAL_SERVER_ERROR();
    }
    return this.getUser(user._id);
}

module.exports.loginUser = async(params) => {
    const user = await AuthModel.filterUser({ email: params.email });
    if (!user) {
        throw HTTP_RESPONSES.UNAUTHORIZED('Invalid email or password')
    }
    const login_flag = await CryptoTool.check(params.password, user.password);
    if (login_flag) {
        delete user.password;        
        const access_token = JwtTool.sign(user, 60);
        return {
            ...user,
            access_token,
            refresh_token: JwtTool.sign(access_token, 60 * 24 * 7)
        };
    } else {
        throw HTTP_RESPONSES.UNAUTHORIZED('Invalid email or password')
    }
}

module.exports.loginUserWithRefreshToken = async(params) => {
    try {
        const access_token = JwtTool.decode(params.refresh_token);
        const user = JwtTool.decode(access_token.data);
        return user.data;
    } catch (e) {
        return HTTP_RESPONSES.UNAUTHORIZED("Invalid token");
    }
}

module.exports.getUser = async(_id) => {
    if (!_id) return null;
    const user = await AuthModel.getUser(_id);
    delete user.password;
    return user;
}