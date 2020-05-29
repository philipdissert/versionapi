const router = require('express').Router();
const verify = require('./verifyToken');
const APIKeys = require('../model/ApiKey');
const uuid = require('uuid');

router.post('/', verify, async (req, res) => {

    const user = await APIKeys.findOne({ userId: req.user});

    if(user != null) {
        res.status(200).send(user.apiKey);
    } else {
        const apiKeyStore = new APIKeys({
            userId: req.user,
            apiKey: uuid.v4()
        });
        const {apiKey} = await apiKeyStore.save();
        res.status(200).send(apiKey);
    }
})

module.exports = router;