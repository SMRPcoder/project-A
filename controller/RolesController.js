const { request, response } = require("express");
const Role = require("../models/Role");


exports.addRoles = (req = request, res = response) => {
    try {
        var { role } = req.body;
        role = role.toUpperCase();
        Role.where({ rolename: role }).findOne().then(data => {
            if (data) {
                res.status(200).json({ message: "Role Already exits", status: false });
            } else {
                const newRole = new Role({ rolename: role });
                newRole.save().then(data => {
                    res.status(200).json({ message: `${role} Role is Created Sucessfully`, status: true });
                })
            }
        })
    } catch (error) {
        console.error(`Error While creating a Role: ${error}`);
        res.status(500).json({ message: "Error While Creating A Role", status: false });
    }
}

exports.editRoles = (req = request, res = response) => {
    try {
        var { role } = req.body;
        role = role.toUpperCase();
        Role.findOneAndUpdate({ _id: req.body.id }, {
            rolename: role
        }).then(data => {
            res.status(200).json({ message: "successfully updated role", status: true, data: data });
        })

    } catch (error) {
        console.error(`Error While Editing a Role: ${error}`);
        res.status(500).json({ message: "Error While Editing A Role", status: false });
    }
}

exports.viewAllRoles = (req = request, res = response) => {
    try {
        Role.find().then(data => {
            res.status(200).json({ data: data, status: true });
        })
    } catch (error) {
        console.error(`Error While View all Roles: ${error}`);
        res.status(500).json({ message: "Error While View all Roles", status: false });
    }
}