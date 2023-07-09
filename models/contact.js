const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// name convention for nameing model is first word is capital
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;