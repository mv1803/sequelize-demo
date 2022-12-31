// const messages = req.lang == "en" ? require('../lang/en/messages') : require('../lang/ko/messages');
module.exports.success = function (req, res, messageCode = null, data = null) {
    let messages;
    switch(req.lang){
        case "en":
            messages = require('../lang/en/messages')
        break;
    
        case "ko":
            messages = require('../lang/ko/messages')
        break;
    
        default:
            messages = require('../lang/en/messages')
        break;
    }
    var response = {};
    response.success = true;
    // response.message = (messageCode ? module.exports.responseMessage(messageCode) : '');
    response.message = messages.getMessage(messageCode);
    // if(typeof data != 'undefined' && data != '' && data != null){
    // }
    if(data != null){
        response.data = data;
    }
    return res.send(response);
};

module.exports.error = function (req, res, messageCode, statusCode = 422) {
    let messages;
    switch(req.lang){
        case "en":
            messages = require('../lang/en/messages')
        break;
    
        case "ko":
            messages = require('../lang/ko/messages')
        break;
    
        default:
            messages = require('../lang/en/messages')
        break;
    }
    var response = {};
    response.success = false;
    response.message = messages.getMessage(messageCode);
    statusCode = (messageCode == 9999) ? 500 : statusCode;
    return res.status(statusCode).send(response)
};
