const _ = require('lodash');

module.exports = (result) => {
  return {
    id: result.id,
    username: result.username,
    account_number: result.accountNumber,
    email_address: result.emailAddress,
    identity_number: result.identityNumber
  }
};