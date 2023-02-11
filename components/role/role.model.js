const _ = require('lodash');
const Mongo = require('../../template/tools/mongo.tool');
const Validation = require('../../template/tools/db-validation.tool');
const RoleSchema = require('./role.schema');
const COLLECTION_NAME = "roles";

module.exports.insertRole = async(payload) => {
    payload._id = Mongo.id();
    payload.is_active = true;
    payload.created_at = new Date();
    payload.modified_at = new Date();

    payload = Validation.validate(RoleSchema.INSERT_ROLE, payload);
    const data = await Mongo.insertOne(COLLECTION_NAME, payload);
    return data;
}

module.exports.updateRole = async(role_id, payload) => {
    payload.modified_at = new Date();

    payload = Validation.validate(RoleSchema.UPDATE_ROLE, payload);
    const data = await Mongo.updateOne(COLLECTION_NAME, { _id: Mongo.id(role_id)}, { $set: payload});
    return data;
}

module.exports.get = async(role_id) => {
    return Mongo.findOne(COLLECTION_NAME, { _id: Mongo.id(role_id) });
}
module.exports.filter = async(filter) => {
    const pipeline = [];
    const match = {};
    if (_.keys(match).length > 0) pipeline.push({ $match: match });
    const data = await Mongo.aggregate(COLLECTION_NAME, pipeline);
    return data;
}
