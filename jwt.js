const jwt = require('jsonwebtoken');
require('dotenv').config();


SECRET = process.env.SECRET;

userdata = {
    username: 'RyanRoss',
    id: '10L25',
};

//CREATE/SIGN A Token

const token = jwt.sign(userdata, SECRET);

console.log(token);

//VERIFY THE TOKEN

try {
    const payload = jwt.verify(token, SECRET);

    console.log(payload);

    const bad = jwt.verify(token, 'cheese');

    console.log(bad);
} catch (error) {
    console.log(error);
}