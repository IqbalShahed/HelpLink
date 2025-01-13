const Volunteer = require('../models/Volunteer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, email, phone, password, location, skills } = req.body;
        const volunteerExists = await Volunteer.findOne({ email });

        if (volunteerExists) {
            return res.status(400).json({ message: 'Volunteer already exists' })
        }

        const volunteer = await Volunteer.create({ name, email, phone, password, location, skills });
        res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const volunteer = await Volunteer.findOne({ email });
        if (volunteer && (await volunteer.matchPassword(password))) {
            const token = jwt.sign({ id: volunteer._id, role: volunteer.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProfile = async (req, res) => {
    let token;
    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization && req.headers.authorization.split(' ')[1]

    };

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const volunteer = await Volunteer.findById(decoded.id).select('-password');

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.json(volunteer);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

const updateProfile = async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]

    };

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { name, email, password, location, skills } = req.body;

        const volunteer = await Volunteer.findByIdAndUpdate(
            decoded.id,
            { name, email, password, location, skills },
            { new: true }

        )
        if (!volunteer) {
            res.status(404).json({ message: 'Volunteer not found!' });
        }
        res.status(200).json({ message: 'Volunteer successfully updated!', volunteer })
    } catch (error) {
        res.status(500).json({ message: `Volunteer update ${error.message}` });
    }
}

module.exports = { register, login, getProfile, updateProfile };