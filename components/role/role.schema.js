const Joi = require('joi');
const { ObjectId } = require('../../template/tools/db-validation.tool');
const ReferenceSchema = require('../../template/schemas/reference.schemas');

module.exports.ADD_ROLE_BODY = {
    institute_id: ObjectId().required(),
    name: Joi.string().required().min(3).max(100),
    privileges: Joi.array().items(ObjectId()).optional().default([])
}

module.exports.PATCH_ROLE_BODY = {
    name: Joi.string().optional().min(3).max(100),
    privileges: Joi.array().items(ObjectId()).optional()
}

module.exports.PATCH_ROLE_PARAMS = {
    role_id: ObjectId().required()
}

module.exports.INSERT_ROLE = {
    ...this.ADD_ROLE_BODY,
    institute: ReferenceSchema.INSTITUTE_SCHEMA.required(),
    _id: ObjectId(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}

module.exports.UPDATE_ROLE = {
    ...this.PATCH_ROLE_BODY,
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}
