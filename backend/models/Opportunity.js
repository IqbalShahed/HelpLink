const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], required: true },
    location: { type: String, required: true },
    scheduleStart: { type: String, required: true },
    scheduleEnd: {type: String, required: true},
    cause: { type: String, enum:['environment', 'education', 'health', 'Others'], required: true },
    image: {type: String, required: true},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true},
    createdAt: {type: Date, default: Date.now}
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;