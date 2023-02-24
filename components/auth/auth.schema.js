const Joi = require('joi');
const { ObjectId, phoneNumber, password } = require('../../template/tools/db-validation.tool');

module.exports.GET_USER = {
    user_id: ObjectId()
}

module.exports.REGISTER_USER = {
    first_name: Joi.string().required().min(3).max(100),
    last_name: Joi.string().required().min(3).max(100),
    password: password().required(),
    phone: phoneNumber().required(),
    email: Joi.string().email().required()
}

module.exports.RESET_USER_PASSWORD = {
    password: password().required(),
    email: Joi.string().email().required()
}

module.exports.LOGIN_USER = {
    password: password().required(),
    email: Joi.string().email().required()
}

module.exports.LOGIN_WITH_REFRESH_TOKEN = {
    refresh_token: Joi.string().required()
}

module.exports.INSERT_USER = {
    ...this.REGISTER_USER,
    password: Joi.string().required(),
    _id: ObjectId(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional(),
    email_verified: Joi.boolean().default(false),
    email_verified_at: Joi.date().default(null),
    phone_verified: Joi.boolean().default(false),
    phone_verified_at: Joi.date().default(null)
}

module.exports.UPDATE_USER_PASSWORD = {
    password: Joi.string().required(),
    modified_at: Joi.date().required()
}

module.exports.UPDATE_USER = {
    first_name: Joi.string().optional().min(3).max(100),
    last_name: Joi.string().optional().min(3).max(100),
    phone: phoneNumber().optional(),
    email_verified: Joi.boolean().optional(),
    email_verified_at: Joi.date().optional(),
    phone_verified: Joi.boolean().optional(),
    phone_verified_at: Joi.date().optional()
}

module.exports.VERIFY_EMAIL_BODY = {
    _id: ObjectId().required(),
    token: Joi.string().required(),
    email: Joi.string().email().required()
}

module.exports.RESEND_EMAIL_VERIFICATION = {
    _id: ObjectId().required(),
    email: Joi.string().email().required()
}