const User = require('../models/User');
const encryption = require('../helpers/encryption');
const validations = require('../helpers/inputValidations');
const token = require('../helpers/tokenValidation');

const { valid } = require('@hapi/joi');
const controller = {};


controller.index = (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    });
}
controller.login = async(req, res) => {
    const error = validations.login(req.body)
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message, data: null });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ error: true, message: 'User not fount', data: null });
    }

    const validPassword = await encryption.decrypt(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: true, message: 'Invalid password', data: null });
    }

    const newToken = token.register(user);
    res.header("auth-token", newToken).json({
        error: false,
        message: 'ok',
        data: { user, token: newToken }
    });

}
controller.register = async(req, res) => {
    const error = validations.register(req.body)
    if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message, data: null })
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).json({ error: true, message: 'User exist', data: null });
    }

    const password = await encryption.encrypt(req.body.password);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    try {
        const userDB = await user.save();
        const newToken = token.register(user);

        res.header("auth-token", newToken).json({
            error: false,
            message: 'ok',
            data: {
                user,
                token: newToken
            }
        });

    } catch (error) {
        res.status(400).json({
            error: true,
            message: 'invalid params',
            data: error
        })
    }
}
controller.dashboard = (req, res) => {
    res.json({
        error: false,
        message: 'ok',
        data: req.user
    });
}

module.exports = controller;