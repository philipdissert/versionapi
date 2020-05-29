const router = require('express').Router();
const verify = require('../verifyMiddleware/verifyToken');
const mailSender = require('../mailSender');

router.get('/', verify,(req, res) => {
    mailSender(req, res);
    res.status(200).send('Verification Mail sent')
})

module.exports = router;