const RoleModel = require("./role.model");
const Reference = require('../../template/tools/reference-tool');

const verifyParams = async (params) => {
    // validate previleges
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