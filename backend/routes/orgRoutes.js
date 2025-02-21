const express = require('express');
const Organization = require('../models/Organization');
const { protect } = require('../middleware/authMiddleware');
const orgController = require('../controllers/orgController');


const router = express.Router();

// Register an Organization
router.post('/register', orgController.register);

// Login an Organization
router.route('/login').post(orgController.login);

// protected route Dashboard of an Organization
router.get('/dashboard', protect, orgController.dashboard);

module.exports = router;