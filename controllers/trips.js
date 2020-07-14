const express = require('express');
const router = express.Router();
const Trip = require('../models/trips.js');
const jwt = require('jsonwebtoken');

//Auth Middleware
const auth = async (req, res, next) => {
    const { authorization } = req.headers; 
    if (authorization) {
        try {
            const token = authorization.split(' ')[1]; 
            const payload = jwt.verify(token, 'secret');
            req.user = payload; 
            next(); 
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).send('NO AUTHORIZATION HEADER');
    }
};
//////////////////////////

router.post('/', auth, async (req, res) => {
    try {
        console.log(req.body);
        const createdTrip = await Trip.create(req.body);
        res.status(200).json(createdTrip);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTrip);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;