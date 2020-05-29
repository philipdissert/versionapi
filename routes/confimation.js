const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');


router.get('/:token', async(req, res) => {
    try {
        const {user} = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
        if(!user) return res.status(400).send('Unknown Web Token');
        const existingUser = await User.findOneAndUpdate({ _id: user}, { $set: {verifiedEmail: true} }, {new: true, useFindAndModify: false},(err, result) => {
            if(err) res.status(400).send();
            result.save(); //Will noch nicht ganz
            res.status(200).send(result);  
            
        });          
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;