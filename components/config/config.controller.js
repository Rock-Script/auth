const ApplicationCache = require('../../template/tools/application.cache.tool');

module.exports.getMicroservices = async () => {
    const data = ApplicationCache.microservices;
    return {
        status: 200,
        data,
        message: 'Successfully microservices'
    }
}