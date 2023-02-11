const PRIVILEGES = require('../../template/contants/privileges');
const RoleService = require('./role.service');

module.exports.getPrivileges = async () => {
    const data = PRIVILEGES;
    return {
        status: 200,
        data,
        message: 'Successfully retrieved privileges'
    }
}

module.exports.getRoles = async(req, res, next) => {
    const data = await RoleService.getRoles();
    return {
        status: 200,
        data,
        message: 'Successfully retrieved roles'
    }
}

module.exports.addRole = async (req, res, next) => {
    const data = await RoleService.addRole(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully added role'
    }
}

module.exports.updateRole = async (req, res, next) => {
    const data = await RoleService.updateRole(req.params.role_id, req.body);
    return {
        status: 200,
        data,
        message: 'Successfully updated role'
    }
}