const Joi = require('joi');
const router = require('express').Router();
const RequestValidation = require('../middlewares/RequestValidation');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

router.get(
    '',
    auth,
    RequestValidation.validateRequest(
        {
            query: Joi.object().keys({
                username: Joi.string().optional(),
                account_number: Joi.string().optional(),
                email_address: Joi.string().optional(),
                identity_number: Joi.string().optional(),
                page: Joi.number().min(1).required(),
                page_size: Joi.number().min(1).required(),
            })
        },
        'query'
    ),
    UserController.getUserList
);

router.post(
    '',
    auth,
    RequestValidation.validateRequest(
        {
            body: Joi.object().keys({
                username: Joi.string().required(),
                account_number: Joi.string().required(),
                email_address: Joi.string().required(),
                password: Joi.string().required(),
                identity_number: Joi.string().required(),
            })
        },
        'body'
    ),
    UserController.addUser
);

router.get(
    '/:id',
    auth,
    RequestValidation.validateRequest(
        {
            params: Joi.object().keys({
                id: Joi.string().required()
            })
        },
        'params'
    ),
    UserController.getUserDetail
);

router.put(
    '/:id',
    auth,
    RequestValidation.validateRequest(
        {
            params: Joi.object().keys({
                id: Joi.string().required()
            }),
            body: Joi.object().keys({
                username: Joi.string().required(),
                account_number: Joi.string().required(),
                email_address: Joi.string().required(),
                password: Joi.string().required(),
                identity_number: Joi.string().required(),
            })
        },
        'body.params'
    ),
    UserController.editUser
);

router.delete(
    '/:id',
    auth,
    RequestValidation.validateRequest(
        {
            params: Joi.object().keys({
                id: Joi.string().required()
            })
        },
        'params'
    ),
    UserController.deleteUser
);

module.exports = router;