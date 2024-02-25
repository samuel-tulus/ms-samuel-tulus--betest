const Crypto = require('crypto');

const isValid = (salt, hashedPassword, input) => {
    const hash = Crypto.pbkdf2Sync(input, salt, 1000, 64, `sha512`).toString(`hex`);

    return hashedPassword === hash;
};

const encrypt = (password) => {
    const salt = Crypto.randomBytes(16).toString('hex');
    const hash = Crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return {
        salt: salt,
        hash: hash
    };
};

module.exports = {
    isValid: isValid,
    encrypt: encrypt
};