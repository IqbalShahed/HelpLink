const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { roleAuth } = require('../middleware/roleMiddleware');
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const applicationController = require('../controllers/applicationController');
const router = express.Router();

/**
 * @route POST /api/applications
 * @desc Apply for an opportunity
 * @access Volunteer only
 */
router.post('/', protect, roleAuth(['volunteer']), applicationController.postApplication);

/**
 * @route GET /api/applications/my-applications
 * @desc Get applications by the logged-in volunteer
 * @access Volunteer only
 */
router.get('/my-applications', protect, roleAuth(['volunteer']), applicationController.myApplications);

/**
 * @route GET /api/applications/opportunity/:id
 * @desc Get applications for a specific opportunity
 * @access Organization only
 */
router.get('/opportunity/:id', protect, roleAuth(['organization']), applicationController.getOpportunityApplications);

/**
 * @route GET /api/applications/
 * @desc Get applications
 * @access Organization only
 */
router.get('/manage', protect, roleAuth(['organization']), applicationController.getApplications);


/**
 * @route PATCH /api/applications/:id/status
 * @desc Update application status
 * @access Organization only
 */
router.patch('/:id/status', protect, roleAuth(['organization']), applicationController.updateApplicationStatus);

module.exports = router;
