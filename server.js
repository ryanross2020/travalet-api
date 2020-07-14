//Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//Globals
const PORT = process.env.PORT || 3000;
const tripController = require('./controllers/trips.js');
const db = mongoose.connection;
const MONGODB_URI =
    process.env.MONGODB_URL || 'mongodb://localhost:27017/trips';

//Dummy user
const user = { username: 'RyanRoss', password: 'password'};

//Whitelist
const whitelist = [
    'http://localhost:1985',
    'https://travalet.herokuapp.com/'
];

//corsOptions 
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

//Database connect
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.on('open', () => {
    console.log('Mongo is Connected');
});

//Middleware
app.use(cors());
app.use(express.json());
app.use('/holidays/', holidayController);

//Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body; 
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username }, 'secret');
        res.status(200).json(token);
    } else {
        res.status(400).send('WRONG USERNAME OR PASSWORD');
    }
});

//LISTENER
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
