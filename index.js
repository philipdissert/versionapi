const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const expressSessions = require('express-session');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const verifyEmailSend = require('./routes/verifyEmail');
const apiKeyRoute = require('./routes/apikeys');
const verifyEmailConf = require('./routes/confimation');
const versionApi = require('./routes/versionApi/versionApi');


dotenv.config();

//Connect to DD
mongoose.connect(process.env.DB_CONNECT,
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
},
() => console.log('Connected to DB'));

//Middlewares
app.use(express.json());
app.use(expressSessions({secret:process.env.TOKEN_SECRET, saveUninitialized: false, resave: false}));

//Route Middelwares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/keys', apiKeyRoute);
app.use('/api/emailverify/conf', verifyEmailConf);
app.use('/api/emailverify/send', verifyEmailSend);
app.use('/api/versionapi', versionApi);
app.listen(3000)