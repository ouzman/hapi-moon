const Boom = require('@hapi/boom');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const validators = require('../../lib/validators');

exports.registerApi = {
    auth: false,
    plugins: {
        crumb: false
    },
    validate: {
        payload: validators.register
    },
    tags: ['api'],
    description: 'register user with api request',
    handler: async (request, h) => {
        try {
            const {name, email, password} = request.payload;
            const user = new User({name, email, password, active: true});
            await user.save();

            return {status: true, message: 'User created successfully'}
        } catch (e) {
            if (e.code && e.code === 11000) {
                return Boom.badRequest('The email address you used is already registered. Please check your details!');
            }

            /* $lab:coverage:off$ */
            request.server.log(['error', 'client', 'createUser'], e);

            return Boom.badRequest(e.message, e);
            /* $lab:coverage:on$ */
        }
    }
};