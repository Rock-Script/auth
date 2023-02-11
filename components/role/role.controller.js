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

module.exports.addRole = async (req, res, next) => {
    const data = await RoleService.addRole(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully added role'
    }
}