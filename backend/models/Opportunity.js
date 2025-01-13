const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], required: true },
    location: { type: String, required: true },
    schedule: { type: String, required: true },
    cause: { type: String, enum:['environment', 'education', 'health', 'Others'], required: true },
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true},
    createdAt: {type: Date, default: Date.now}
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;