const Application = require("../models/Application");
const Opportunity = require("../models/Opportunity");


const postApplication = async (req, res) => {
    try {
        const { opportunityId, message } = req.body;

        const opportunity = await Opportunity.findById(opportunityId);
        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        // console.log('Request Body:', req.body);
        // console.log('User ID:', req.user._id);

        // Check if the volunteer has already applied
        const existingApplication = await Application.findOne({
            volunteer: req.user._id,
            opportunity: opportunityId
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this opportunity' });
        }

        const application = new Application({
            volunteer: req.user._id, // Volunteer is stored in the organization field for simplicity
            opportunity: opportunityId,
            message,
        });

        // console.log('Request Headers:', req.headers);
        // console.log('Request Body:', req.body);
        // console.log('Authenticated User:', req.user);


        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(500).json({ message: `Application Post: ${error.message}` });
    }
}

const getApplications = async (req, res) => {
    try {
        // Find opportunities created by the authenticated organization
        const opportunities = await Opportunity.find({ organization: req.user._id }).select('_id');
        const opportunityIds = opportunities.map(opportunity => opportunity._id);

        // Find applications for these opportunities
        const applications = await Application.find({ opportunity: { $in: opportunityIds } })
            .populate('volunteer', 'name email')
            .populate('opportunity', 'title');

        res.status(200).json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch applications." });
    }
};

const myApplications = async (req, res) => {
    try {
        const applications = await Application.find({ volunteer: req.user._id }).populate('opportunity');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOpportunityApplications = async (req, res) => {
    try {
        const { id } = req.params;

        const opportunity = await Opportunity.findById(id);

        if (opportunity.organization.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        const applications = await Application.find({ opportunity: id })
            .populate('volunteer', 'name email')
            .populate('opportunity', 'title');

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const opportunity = await Opportunity.findById(application.opportunity);
        if (opportunity.organization.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }
        // console.log('Request received to update application status:', req.params.id, req.body);


        application.status = status;
        const updatedApplication = await application.save();
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { postApplication, myApplications, getOpportunityApplications, updateApplicationStatus, getApplications };