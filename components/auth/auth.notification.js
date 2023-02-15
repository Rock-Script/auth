const APITool = require('../../template/tools/api.tool');
const ApplicationCache = require('../../template/tools/application.cache.tool');
const NOTIFICATION_TYPES = require('../../template/contants/notification-type');

module.exports.sendSignupEmail = async(user, token) => {
    const verify_email_link = `${ApplicationCache.microservices.web_signup_verify}?token=${token}&first_name=${user.first_name}&last_name=${user.last_name}&email=${user.email}&_id=${user._id.toString()}`;
    const payload = {
        type: [NOTIFICATION_TYPES.EMAIL],
        email_template_id: ApplicationCache.email_templates['sign_up'],
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
            verify_email_link: verify_email_link
        },
        reciever_ids: [
            {
                _id: user._id,
                type: 'user'
            }
        ]
    }
    APITool.post(ApplicationCache.microservices.notification_send, payload);
}