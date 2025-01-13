const Opportunity = require("../models/Opportunity");

const postOpportunity = async (req, res) => {
    try {
        const { title, description, requiredSkills, location, schedule, cause } = req.body;

        const newOpportunity = new Opportunity({
            title,
            description,
            requiredSkills,
            location,
            schedule,
            cause,
            organization: req.user._id
        })

        const savedOpportunity = await newOpportunity.save();
        res.status(201).json(savedOpportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const myOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.find({ organization: req.user._id })
            .select('title description requiredSkills location schedule cause');
        res.status(200).json(opportunities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const allOpportunities = async (req, res) => {
    try {
        const { location, skills, cause } = req.query;

        //Build dynamic filters
        const filter = {};
        if (location) filter.location = location;
        if (skills) filter.requiredSkills = { $in: skills.split(',') };
        if (cause) filter.cause = cause;

        const opportunities = await Opportunity.find(filter).populate('organization', 'name email');
        res.status(200).json(opportunities)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const opportunityById = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id).populate('organization', 'name email');

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        res.status(200).json(opportunity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOpprtunity = async (req, res) => {
    try {
        const { id } = req.params;

        const opportunity = await Opportunity.findById(id);
        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        // Ensure the opportunity belongs to the logged-in organization
        if (opportunity.organization.toString() !== req.organization._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this opportunity' });
        }

        const updatedOpportunity = await Opportunity.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedOpportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOpportunity = async (req, res) => {
    try {
        const { id } = req.params;

        const opportunity = await Opportunity.findById(id);
        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        // Ensure the opportunity belongs to the logged-in organization
        if (opportunity.organization.toString() !== req.organization._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this opportunity' });
        }

        await Opportunity.findByIdAndDelete(id);
        res.status(200).json({ message: 'Opportunity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { postOpportunity, allOpportunities, updateOpprtunity, deleteOpportunity, myOpportunities, opportunityById }