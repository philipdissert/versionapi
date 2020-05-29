const router = require('express').Router();
const verify = require('../../verifyMiddleware/verifyApiToken');
const gitlab = require('./gitlab.js')

router.post('/gitlab', verify, gitlab);

module.exports = router;