const RoleController = require('./role.controller');
const RoleSchema = require('./role.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = '/roles';
const routes = [
    {
        path: `${path}/privileges`,
        method: ROUTE_METHODS.GET,
        validation: {
        },
        handler: RoleController.getPrivileges
    },
    {
        path: `${path}`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: RoleSchema.ADD_ROLE_BODY
        },
        handler: RoleController.addRole
    },
    // {
    //     path: `${path}`,
    //     method: ROUTE_METHODS.PATCH,
    //     validation: {
    //         body: AuthSchema.RESET_USER_PASSWORD
    //     },
    //     handler: RoleController.resetUserPassword
    // },
    // {
    //     path: `${path}`,
    //     method: ROUTE_METHODS.GET,
    //     validation: {
    //         params: AuthSchema.GET_USER
    //     },
    //     handler: RoleController.getUser
    // }
]

module.exports = routes;