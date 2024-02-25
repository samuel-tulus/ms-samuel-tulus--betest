const _ = require('lodash');
const User = require('../models/User');
const BaseResponse = require('../response/BaseResponse');
const Logger = require('../helpers/Logger');
const GetUserListResponse = require('../response/GetUserListResponse');
const GetUserDetailResponse = require('../response/GetUserDetailResponse');
const PaginationHelper = require('../helpers/PaginationHelper');
const RedisService = require('../services/RedisService');

const getUserList = async (req, res) => {
    const {
        query: {
            username,
            account_number,
            email_address,
            identity_number,
            page,
            page_size
        }
    } = req;
    try {
        const result = await User.find({
            ...username && {username: username},
            ...account_number && {accountNumber: account_number},
            ...email_address && {emailAddress: email_address},
            ...identity_number && {identityNumber: identity_number}
        }, null, {
            skip: PaginationHelper(page, page_size),
            limit: page_size
        });
        const response = GetUserListResponse(result);
        
        Logger.info(response);
        res.send(BaseResponse.successResponse(response));
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

const addUser = async (req, res) => {
    const {
        body: {
            username,
            account_number,
            email_address,
            password,
            identity_number,
        }
    } = req;
    try {
        await User.create({
            username: username,
            accountNumber: account_number,
            emailAddress: email_address,
            password: password,
            identityNumber: identity_number
        });
        res.send(BaseResponse.successResponse());
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

const getUserDetail = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const REDIS_KEY = `User-${id}`;

        let result = await RedisService.getData(REDIS_KEY);
        if (_.isEmpty(result)) {
            result = await User.findById(id);
            await RedisService.setData(REDIS_KEY, result);
        }
        
        const response = GetUserDetailResponse(result);
        
        Logger.info(response);
        res.send(BaseResponse.successResponse(response));
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

const editUser = async (req, res) => {
    const {
        params: { id },
        body: {
            username,
            account_number,
            email_address,
            password,
            identity_number,
        }
    } = req;

    try {
        await User.findByIdAndUpdate(id, {
            ...username && {username: username},
            ...account_number && {accountNumber: account_number},
            ...email_address && {emailAddress: email_address},
            ...password && {password: password},
            ...identity_number && {identityNumber: identity_number}
        });
        res.send(BaseResponse.successResponse());
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

const deleteUser = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        await User.findByIdAndDelete(id);
        res.send(BaseResponse.successResponse());
    } catch (err) {
        Logger.error(err);
        res.status(err.errorCode || 500).send(BaseResponse.errorResponse(err));
    }
};

module.exports = {
    getUserList,
    addUser,
    getUserDetail,
    editUser,
    deleteUser,
};