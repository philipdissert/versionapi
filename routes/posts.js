const router = require('express').Router();
const verify = require('../verifyMiddleware/verifyApiToken');
const mailSender = require('../mailSender');

router.get('/', verify,(req, res) => {
    mailSender(req.user, 'mail@mail.test');
    res.json({ posts: { title: 'my first post', description: 'asdasgfsagag' } })
})

module.exports = router;