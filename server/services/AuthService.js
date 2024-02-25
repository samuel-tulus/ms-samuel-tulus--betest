const Users = require('../models/User');
const BusinessException = require('../exceptions/BusinessException');
const PasswordHelper = require('../helpers/PasswordHelper');

const login = async (payload) => {
    const username = payload && payload.username;
    const password = payload && payload.password;
    
    const user = await Users.getUserByUsername(username);
    if (!user || user.length === 0) {
        throw BusinessException.notFound('user');
    }

    const salt = user[0].salt;
    const hashedPassword = user[0].password;

    const isValidPassword = PasswordHelper.isValid(salt, hashedPassword, password);

    return {
        isLoggedIn: isValidPassword
    };
};

module.exports = {
    login: login
};