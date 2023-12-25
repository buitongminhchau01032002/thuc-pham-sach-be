const Role = require('../models/Role');

// [GET] api/role
const read = async (req, res, next) => {
    try {
        let roles;
        roles = await Role.find();
        return res.status(200).json({ success: true, roles });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [POST] api/role
const create = async (req, res, next) => {
    const { name, description, functions } = req.body;
    // Validate field
    if (!name) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed field' });
    }

    try {
        const role = new Role({
            name,
            description,
            functions,
        });
        await role.save();
        return res.status(201).json({ success: true, role });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [GET] api/role/:id
const readOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        let role;
        role = await Role.findOne({ id });

        return res.status(200).json({ success: true, role });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [PUT] api/role/:id
const update = async (req, res, next) => {
    const id = Number(req.params.id);
    const { name, description, functions } = req.body;

    const updateObj = {};
    if (name) {
        updateObj.name = name;
    }
    if (description) {
        updateObj.description = description;
    }
    if (functions) {
        updateObj.functions = functions;
    }

    // Update role
    try {
        const role = await Role.findOneAndUpdate({ id }, updateObj, {
            new: true,
        });

        return res.status(200).json({ success: true, role });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

// [DELETE] api/role/:id
const destroy = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ success: false, status: 400, message: 'Missed id' });
    }

    try {
        await Role.delete({ id: req.params.id });
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, status: 500, message: 'Internal server error' });
    }
};

module.exports = { read, create, readOne, update, destroy };
