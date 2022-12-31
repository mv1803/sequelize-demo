const MESSAGES = {
    // Authentication
    '1001': 'Your credentials do not match our records',
    '1002': 'Login successfully',
    '1003': 'Register successfully',
    '1004': 'Get profile successfully',
    '1005': 'The email has already been taken.',
    '1006': 'Logout successfully!',

    // Common
    '9000': "Please Enter Valid data!",
    '9999': "Something went wrong!",
}

module.exports.getMessage = function (messageCode) {
    if(isNaN(messageCode)){
        return messageCode; 
    }
    return messageCode ? MESSAGES[messageCode] : '';
};
