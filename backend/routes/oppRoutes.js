const express = require('express');
const Opportunity = require('../models/Opportunity');
const { roleAuth } = require('../middleware/roleMiddleware');
const { protect } = require('../middleware/authMiddleware');
const oppController = require('../controllers/oppController');


const router = express.Router();


/**
 * @route POST /api/opportunities
 * @desc Create a new opportunity
 * @access Organization only
 */

router.post('/postOpportunity', protect, roleAuth(['organization']), oppController.postOpportunity);


/**
 * @route Get /api/my-opportunities
 * @desc Create a new opportunity
 * @access Organization only
 */

router.get('/my-opportunities', protect, roleAuth(['organization']), oppController.myOpportunities);

/**
 * @route GET /api/opportunities
 * @desc Fetch all opportunities with optional filters
 * @access Public
 */

router.get('/allOpportunities', oppController.allOpportunities);

/**
 * @route Get /api/opportunities/:id
 * @desc Get a specific opportunity by ID
 * @access Volunteer Only
 */
router.get('/:id', oppController.opportunityById);


/**
 * @route PUT /api/opportunities/:id
 * @desc Update an opportunity
 * @access Organization only
 */
router.put('/:id', protect, roleAuth(['organization']), oppController.updateOpprtunity);

/**
 * @route DELETE /api/opportunities/:id
 * @desc Delete an opportunity
 * @access Organization only
 */
router.delete('/:id', protect, roleAuth(['organization']), oppController.deleteOpportunity);

module.exports = router;