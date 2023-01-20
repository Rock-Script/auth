const Mongo = require('../../template/tools/mongo.tool');
const Validation = require('../../template/tools/db-validation.tool');
const AuthSchema = require('./auth.schema');
const COLLECTION_NAME = "users";

module.exports.insertUser = async(payload) => {
    payload._id = Mongo.id();
    payload.is_active = true;
    payload.created_at = new Date();
    payload.modified_at = new Date();

    payload = Validation.validate(AuthSchema.INSERT_USER, payload);
    const data = await Mongo.insertOne(COLLECTION_NAME, payload);
    return data;
}

module.exports.updateUser = async(user_id, payload) => {
    payload._id = Mongo.id();
    payload.modified_at = new Date();

    payload = Validation.validate(AuthSchema.UPDATE_USER_PASSWORD, payload);
    const data = await Mongo.updateOne(COLLECTION_NAME, { _id: Mongo.id(user_id)}, { $set: payload});
    return data;
}

module.exports.getUser = async(_id) => {
    const data = await Mongo.findOne(COLLECTION_NAME, { _id: Mongo.id(_id)}, { password: 0 });
    return data;
}

module.exports.filterUser = async(filter) => {
    const data = await Mongo.findOne(COLLECTION_NAME, filter);
    return data;
}
