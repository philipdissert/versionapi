const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


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

//Route Middelwares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.listen(3000)