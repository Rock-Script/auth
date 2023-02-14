const RoleModel = require("./role.model");
const Reference = require('../../template/tools/reference-tool');

const verifyParams = async (params) => {
    // validate privileges
    if (params.institute_id) {
        params.institute = await Reference.getInstitute(params.institute_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('institute', params.institute_id);
    }

    return params;
}

module.exports.addRole = async (params) => {
    params = await verifyParams(params);
    return await RoleModel.insertRole(params);
}

module.exports.updateRole = async (role_id, params) => {
    const update_role_response = await RoleModel.updateRole(role_id, params);
    if (update_role_response) {
        return this.getRole(role_id);
    }
    return null;
}

module.exports.getRoles = async (params) => {
    return await RoleModel.filter(params);
}

module.exports.getRole = async (role_id) => {
    return await RoleModel.get(role_id);
}