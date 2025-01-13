const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    location: { type: String },
    skills: [String],
    password: { type: String, required: true },
    role: {type: String, default: 'volunteer'},
    createAt: { type: Date, default: Date.now }
});

// Hash the password before saving
volunteerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Ensure `this` refers to a document.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare input password with hashed password
volunteerSchema.methods.matchPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
}

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
