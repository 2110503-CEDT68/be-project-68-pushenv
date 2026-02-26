const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true,
        maxlength: [100, 'Company name cannot be more than 100 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        trim: true,
        maxlength: [200, 'Address cannot be more than 200 characters']
    },
    website: {
        type: String,
        required: [true, 'Please add a website']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    telephone: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [/^\d{10}$/, 'Please add a valid 10-digit telephone number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);
