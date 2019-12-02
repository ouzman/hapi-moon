const mongoose = require('mongoose');
const User = mongoose.model('User');
const Boom = require('@hapi/boom');

exports.plugin = {
    async register(server, options) {
        await server.register(require('@hapi/basic'));

        const validate = (request, username, password, h) => {
            const loginResult = User.login(username, password);

            if (!loginResult) {
                throw Boom.unauthorized("Invalid credentials");
            } else {
                const {name, email} = loginResult;
                return h.authenticated({credentials: {name, email}});
            }
        };

        server.auth.strategy('simple', 'basic', { validate });
        server.auth.default('simple');
    },
    name: 'authentication-rules',
    version: require('../package.json').version
};
