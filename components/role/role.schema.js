const Joi = require('joi');
const { ObjectId } = require('../../template/tools/db-validation.tool');
const ReferenceSchema = require('../../template/schemas/reference.schemas');

module.exports.ADD_ROLE_BODY = {
    institute_id: ObjectId().required(),
    name: Joi.string().required().min(3).max(100),
    previleges: Joi.array().items(ObjectId()).optional().default([])
}

module.exports.INSERT_ROLE = {
    ...this.ADD_ROLE_BODY,
    institute: ReferenceSchema.INSTITUTE_SCHEMA.required(),
    _id: ObjectId(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}
