const Company = require('../models/Company');

//@desc     Get all companies
//@route    GET /api/v1/companies
//@access   Private
exports.getCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();

        res.status(200).json({
            success: true,
            count: companies.length,
            data: companies
        });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error.stack);
    }
};

//@desc     Get single company
//@route    GET /api/v1/companies/:id
//@access   Private
exports.getCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ success: false, msg: 'Company not found' });
        }

        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error.stack);
    }
};

//@desc     Create new company
//@route    POST /api/v1/companies
//@access   Private/Admin
exports.createCompany = async (req, res, next) => {
    try {
        const company = await Company.create(req.body);

        res.status(201).json({
            success: true,
            data: company
        });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error.stack);
    }
};

//@desc     Update company
//@route    PUT /api/v1/companies/:id
//@access   Private/Admin
exports.updateCompany = async (req, res, next) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!company) {
            return res.status(404).json({ success: false, msg: 'Company not found' });
        }

        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error.stack);
    }
};

//@desc     Delete company
//@route    DELETE /api/v1/companies/:id
//@access   Private/Admin
exports.deleteCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ success: false, msg: 'Company not found' });
        }

        await company.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({ success: false });
        console.log(error.stack);
    }
};
