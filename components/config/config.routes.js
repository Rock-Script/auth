const ConfigController = require('./config.controller');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = '/configs';
const routes = [
    {
        path: `${path}/microservices`,
        method: ROUTE_METHODS.GET,
        validation: {
        },
        handler: ConfigController.getMicroservices
    }
]

module.exports = routes;