const jwt = require('jsonwebtoken');
const Joi = require('joi');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
        fullname: Joi.string().min(5).max(100).required(),
        phone: Joi.string().length(11).required(),
        // role: Joi.string().min(3).max(100).required(),
        // avatar: Joi.string().allow(''),
        // permission: Joi.string().min(3).max(100),
        // department: Joi.string().min(3).max(100)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }

    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }

    next();
};

module.exports = { authenticateToken, signupValidation, loginValidation };
