const router = require('express').Router();
const verify = require('../verifyMiddleware/verifyApiToken');
const gitlab = require('./versionApi/gitlab.js')
const node = require('./versionApi/node.js');

const allVersions = function(req, res) {
    res.json(['gitlab', 'node']);
};

router.get('/gitlab', gitlab);
router.get('/node', verify, node);
router.get('/', allVersions);

module.exports = router;