const AuthModel = require('./auth.model');
const CryptoTool = require('../../template/tools/crypto.tool');
const ReferenceTool = require('../../template/tools/reference-tool');
const JwtTool = require('../../template/tools/jwt.tool');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const AuthNotification = require('./auth.notification');

module.exports.addUser = async(params) => {
    params.password = await CryptoTool.encrypt(params.password);
    const insert_response = await AuthModel.insertUser(params);
    const user = await this.getUser(insert_response?.insertedId);
    await generateTokenAndSendSignupEmail(user);
    return user;
}

module.exports.resendVerificationEmail = async(params) => {
    const user = await this.getUser(params._id);
    if (!user) {
        throw HTTP_RESPONSES.NOT_FOUND('User', params.email);
    }
    try {
        const data = await generateTokenAndSendSignupEmail(user);
        return (data.status === 200);
    } catch (e) {
        return false;
    }
}

module.exports.resetPassword = async(params) => {
    const user = await AuthModel.filterUser({ email: params.email });
    if (!user) {
        throw HTTP_RESPONSES.NOT_FOUND('User', params.email);
    }
    params.password = await CryptoTool.encrypt(params.password);
    const update_response = await AuthModel.updateUserPassword(user._id, params);
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
        const members = await ReferenceTool.getMembers({email: user.email});
        return {
            ...user,
            members,
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
        let user = JwtTool.decode(access_token.data);
        const members = await ReferenceTool.getMembers({email: user.email});
        user = await this.getUser(user.data._id);
        return {
            ...user,
            members,
            access_token: access_token.data,
            refresh_token: params.refresh_token
        };
    } catch (e) {
        throw HTTP_RESPONSES.UNAUTHORIZED("Invalid token");
    }
}

module.exports.getUser = async(_id) => {
    if (!_id) return null;
    const user = await AuthModel.getUser(_id);
    delete user.password;
    return user;
}


module.exports.verifyEmail = async(params) => {
    let data; 
    try  {
        data = JwtTool.decode(params.token);
        data = data.data
    } catch (e) {
        const user = await this.getUser(params._id);
        await generateTokenAndSendSignupEmail(user);
        throw HTTP_RESPONSES.BAD_REQUEST("Invalid token, please check you mailbox for new verification email");
    }
    
    if (data.email !== params.email) throw HTTP_RESPONSES.UNAUTHORIZED("Incorrect token or email");
    if (data._id) {
        let user = await this.getUser(data._id);
        if (!user) throw HTTP_RESPONSES.UNAUTHORIZED("User not found");
        await AuthModel.updateUser(user._id, { email_verified: true, email_verified_at: new Date() });
        user = await this.getUser(data._id);
        return user;
    }
}


const generateTokenAndSendSignupEmail = async(user) => {
    const token = JwtTool.sign({
        _id: user._id.toString(),
        email: user.email
    }, 60 * 24 * 7);
    return await AuthNotification.sendSignupEmail(user, token);
}