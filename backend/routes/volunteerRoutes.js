const express = require('express');
const volunteerController = require('../controllers/volunteerController')

const router = express.Router();

// Register a new volunteer
router.post('/register', volunteerController.register)

// Login volunteer
router.post('/login', volunteerController.login);

// Get volunteer profile
router.route('/profile').get(volunteerController.getProfile);

//Update volunteer profile
router.route('/update').put(volunteerController.updateProfile);

module.exports = router;