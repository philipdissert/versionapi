const APIKeys = require('../model/ApiKey');

module.exports = async function(req, res, next) {
    const token = req.header('apiKey');

    const apiKey = await APIKeys.findOne({ apiKey: token});
    
    if(!apiKey) return res.status(401).send('Access Denied - set apiKey Header');
    req.user = apiKey.userId;
    next();
}