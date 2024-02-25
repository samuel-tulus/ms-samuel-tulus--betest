const Joi = require('joi');
const router = require('express').Router();
const RequestValidation = require('../middlewares/RequestValidation');
const AuthController = require('../controllers/AuthController');

router.post(
    '/login',
    RequestValidation.validateRequest(
        {
            body: Joi.object().keys({
                username: Joi.string().min(1).required(),
                password: Joi.string().min(1).required()
            })
        },
        'body'
    ),
    AuthController.login
);

module.exports = router;