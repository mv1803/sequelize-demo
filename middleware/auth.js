const db = require('../config/db.config.js');

// Refer : https://caffeinecoding.com/leveraging-express-middleware-to-authorize-your-api/
var userAuth = async function (req, res, next) {
    const CustomerSession = db.customer_session;
    const Customer = db.customers;
    headerToken = req.headers.authorization ? req.headers.authorization : null;
    isAuth = await CustomerSession.findOne({ where: { token: headerToken } });
    if (isAuth != null) {
        let customerData = await Customer.findOne({where: {id: isAuth.customer_id}})
        req.lang = customerData.toJSON().default_lang
        next()
    } else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized',
        })
    }
}

module.exports = {
    userAuth,
};
