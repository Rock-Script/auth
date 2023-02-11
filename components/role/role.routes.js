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
        method: ROUTE_METHODS.GET,
        validation: {
        },
        handler: RoleController.getRoles
    },
    {
        path: `${path}`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: RoleSchema.ADD_ROLE_BODY
        },
        handler: RoleController.addRole
    },
    {
        path: `${path}/:role_id`,
        method: ROUTE_METHODS.PATCH,
        validation: {
            body: RoleSchema.PATCH_ROLE_BODY,
            params: RoleSchema.PATCH_ROLE_PARAMS
        },
        handler: RoleController.updateRole
    },
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