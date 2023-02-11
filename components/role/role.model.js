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

// module.exports.updateRole = async(user_id, payload) => {
//     payload._id = Mongo.id();
//     payload.modified_at = new Date();

//     payload = Validation.validate(RoleSchema.UPDATE_MEMBER, payload);
//     const data = await Mongo.updateOne(COLLECTION_NAME, { _id: Mongo.id(user_id)}, { $set: payload});
//     return data;
// }

