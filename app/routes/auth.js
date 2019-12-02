exports.plugin = {
    async register(server, options) {
        const Controller = require('../controllers/auth');
        server.route([
            {
                method: 'POST',
                path: '/register_api',
                options: Controller.registerApi
            }
        ]);
    },
    version: require('../../package.json').version,
    name: 'auth-route'
};
