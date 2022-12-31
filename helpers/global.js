/**
 * Define here all helpers file as global variable
 */
const db = require('../config/db.config.js');
const dbObject = require('../config/db.config.js');

// Provide sucess and error related response method 
if (!global.RESPONSE)
    global.RESPONSE = require('./response.js');

// Provide file manipulation related functions 
if (!global.FILEACTION)
    global.FILEACTION = require('./files.js');

if (!global.FUNCTIONS)
    global.FUNCTIONS = require('./functions');

// Provide assets url functions
if (!global.ASSETS)
    global.ASSETS = require('./assets.js');

if (!global.getAuthUser)
    global.getAuthUser = async function(req) {
        var headerToken = req.headers.authorization ? req.headers.authorization : null;
        var userSessionObj = await dbObject.customer_session.findOne({ where: { token: headerToken } });
        var userObj = null;
        if (userSessionObj) {
            userObj = await dbObject.customers.findOne({
                where:{id:userSessionObj.customer_id},
                // attributes: ['id', 'email'],
            });
        }
        return userObj;
    };

if (!global.getUserProfile)
    global.getUserProfile = async function(id) {
    var userObj = {};
    userData = await dbObject.customers.findOne({
        where:{id : id},
    });
    userObj = userData.toJSON() 
    return userObj;
};

