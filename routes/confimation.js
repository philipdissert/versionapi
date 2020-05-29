const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');


router.get('/:token', async(req, res) => {
    try {
        const {user} = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        if(!user) return res.status(400).send('Unknown Web Token');
        await User.findOneAndUpdate({ _id: user}, { $set: {verifiedEmail: true} }, {useFindAndModify: false}, (err, user) => {
            if(err) return res.status(400).send("Did not find User")
            res.status(200).send("Email verified");
        });          
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;