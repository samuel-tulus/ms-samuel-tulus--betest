const _ = require('lodash');

module.exports = (result) => {
    return _.map(result, item => ({
        id: item.id,
        username: item.username,
        account_number: item.accountNumber,
        email_address: item.emailAddress,
        identity_number: item.identityNumber
    }));
};