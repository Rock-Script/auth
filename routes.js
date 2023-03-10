const Router = require('express').Router();
const RouteTool = require('./template/tools/route.tool');

RouteTool.setRouter(Router);
RouteTool.addRoutes(require('./components/auth/auth.routes'));
RouteTool.addRoutes(require('./components/role/role.routes'));
RouteTool.addRoutes(require('./components/config/config.routes'));

module.exports = Router;