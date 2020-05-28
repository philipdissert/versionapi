const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');



router.post('/register', async (req, res) => {

    //Validation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if the user already exists in the database
    const emailExists = await User.findOne({ email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user.id});
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {

    //Validate User
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const errorMessage = 'Email or password is wrong';

    //Check if the user already exists in the database
    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send(errorMessage);

    //is Password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send(errorMessage);

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;