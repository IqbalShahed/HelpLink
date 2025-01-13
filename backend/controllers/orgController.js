const Organization = require('../models/Organization');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, email, phone, website, mission, location, password } = req.body;

        // Check if organization already exists
        const orgExists = await Organization.findOne({ name, email, phone, website });
        if (orgExists) {
            res.status(400).json({ message: 'Organization Already Exists' });
        }

        const organization = new Organization({ name, email, phone, website, mission, location, password });
        await organization.save();
        res.status(201).json({ message: 'Organization Created Successfully', organization });
    } catch (error) {
        res.status(500).json({ message: `OrgRegister ${error.message}` });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const organization = await Organization.findOne({ email });
        if (organization && (await organization.matchPassword(password))) {
            const token = jwt.sign({ id: organization._id, role: organization.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const dashboard = async (req, res) => {
    res.json({ message: `Welcome ${req.organization.name} to your dashboard` })
}

module.exports = { register, login, dashboard };