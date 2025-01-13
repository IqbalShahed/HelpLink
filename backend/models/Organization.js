const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const organizationSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    mission: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, unique: true },
    password: { type: String, required: true },
    role: {type: String, default: 'organization'},
    createAt: { type: Date, default: Date.now }
});

// Hash password before saving
organizationSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Compare input password with hashed password
organizationSchema.methods.matchPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
}

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;