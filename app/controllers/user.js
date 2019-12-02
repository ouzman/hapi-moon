exports.view = {
    tags: ['api'],
    description: 'main request handler',
    handler: async (request, h) => {
        return request.auth.credentials;
    }
};
