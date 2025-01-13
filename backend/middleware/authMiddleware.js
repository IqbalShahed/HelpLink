const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');
const Volunteer = require('../models/Volunteer');
require('dotenv').config();


const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role === 'volunteer') {
                req.user = await Volunteer.findById(decoded.id).select('-password');
            } else {
                req.user = await Organization.findById(decoded.id).select('-password');
            }

            if (!req.user) {
                return res.status(401).json({ message: 'authMiddleware - Not authorized: User not found' })
            }
            req.role = decoded.role; // Store role for further use
            // console.log('Token:', token);
            // console.log('Decoded User:', req.user);
            

            next();
        } catch (error) {
            res.status(401).json({ message: `authMiddleware - Not authorized token failed!` })
        }
    } else {
        res.status(401).json({ message: 'authMiddleware - Not authorized: No token' });
    }
};

module.exports = { protect };