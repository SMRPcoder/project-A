const { request, response } = require("express");
const { AddUserSchema, EditUserSchema } = require("../validation/validationSchema");
const { validateWith } = require("../validation/validate");
const User = require("../models/User");
const Role = require("../models/Role");
const { createJWT } = require("../functions/function");
const RolePermission = require("../models/RolePermission");

exports.viewRolesList = (req = request, res = response) => {
    try {
        Role.where({ rolename: { $ne: "ADMIN" } }).find().then(data => {
            res.status(200).json({ data: data, status: true });
        })
    } catch (error) {
        console.error(`Error While Fetching Role Details - Error: ${error}`);
        res.status(500).json({ message: "Error While Role Employee Details", status: false });
    }
}

exports.addUser = (req = request, res = response) => {
    try {
        const is_valid = validateWith(AddUserSchema, req.body);
        if (is_valid.status) {
            const { email, firstname, roleId, lastname, password } = req.body;
            User.where({ email: email }).findOne().then((data) => {
                if (data) {
                    res.status(200).json({ message: "User Already Exits" });
                } else {
                    var roleData;
                    Role.findById(roleId).then(roledata => {
                        if (!roledata) {
                            return res.status(422).json({ message: "Given Role Is Not Defined", status: false });
                        } else {
                            roleData = roledata;
                        }
                    })
                    var newuserupdate = {
                        email,
                        firstname,
                        lastname,
                        roleId,
                        password
                    }
                    if (req.file) {
                        newuserupdate["profile"] = req.file.path;
                    }
                    const newuser = new User(newuserupdate)
                    newuser.populate("roleId");
                    newuser.save().then(async (data) => {

                        const token = createJWT(data);
                        res.status(200).json({ message: `Created A ${roleData.rolename} Successfully`, token: token, status: true });
                    })
                }
            })
        } else {
            res.status(422).json({ message: `${is_valid.error}` });
        }

    } catch (error) {
        console.error(`Error Occured While User Adding- Error : ${error}`)
        res.status(500).json({ message: "Error Occured While User Adding- Error", status: false });
    }
}

exports.viewAllEmployees = async (req = request, res = response) => {
    try {
        const roleData = await Role.where({ rolename: "EMPLOYEE" }).findOne()
        User.where({ roleId: roleData._id }).find().populate("roleId").then(data => {
            res.status(200).json({ data: data, status: true });
        })
    } catch (error) {
        console.error(`Error While Fetching Employee Details - Error: ${error}`);
        res.status(500).json({ message: "Error While Fetching Employee Details", status: false });
    }
}

exports.viewEmployee = async (req = request, res = response) => {
    try {

        User.where({ _id: req.body.id }).find().populate("roleId").then(data => {
            res.status(200).json({ data: data, status: true });
        })
    } catch (error) {
        console.error(`Error While Fetching Employee Details - Error: ${error}`);
        res.status(500).json({ message: "Error While Fetching Employee Details", status: false });
    }
}

exports.viewAllUsers = async (req = request, res = response) => {
    try {
        const roleData = await Role.where({ rolename: "USER" }).findOne().exec()
        User.where({ roleId: roleData._id }).find().populate("roleId").then(data => {
            res.status(200).json({ data: data, status: true });
        })
    } catch (error) {
        console.error(`Error While Fetching Users Details - Error: ${error}`);
        res.status(500).json({ message: `Error While Fetching Users Details-${error}`, status: false });
    }
}

exports.viewUser = (req = request, res = response) => {
    try {
        // const roleData=await Role.where({rolename:"USER"}).findOne().exec()
        User.where({ _id: req.body.id }).find().populate("roleId").then(data => {
            res.status(200).json({ data: data, status: true });
        })
    } catch (error) {
        console.error(`Error While Fetching Users Details - Error: ${error}`);
        res.status(500).json({ message: "Error While Fetching Users Details", status: false });
    }
}

exports.editEmployee = (req = request, res = response) => {
    try {
        const { id, firstname, lastname, email } = req.body;
        // Role.where({ _id: roleId }).findOne().then(data => {
        // if (data && data.get("rolename") == "EMPLOYEE") {
        User.findOneAndUpdate({ _id: id }, {
            firstname,
            lastname,
            email
        }).then(data => {
            res.status(200).json({ message: "Edited Successfully", status: true });
        })
        // } else {
        //     res.status(202).json({ message: "Employee Not Found", status: false })
        // }
        // }
        // )

    } catch (error) {
        console.error(`Error While Editing a Employee: ${error}`);
        res.status(500).json({ message: "Error While Editing A Employee", status: false });
    }
}

exports.editUser = (req, res) => {
    try {
        const { id, firstname, lastname, email, roleId } = req.body;
        // Role.where({ _id: roleId }).findOne().then(data => {
        //     if (data && data.get("rolename") == "USER") {
        User.findOneAndUpdate({ _id: id }, {
            firstname,
            lastname,
            email
        }).then(data => {
            res.status(200).json({ message: "Edited Successfully", status: true });

        })
        //     } else {
        //         res.status(202).json({ message: "Employee Not Found", status: false })
        //     }
        // })

    } catch (error) {
        console.error(`Error While Editing a User: ${error}`);
        res.status(500).json({ message: "Error While Editing A User", status: false });
    }
}

exports.deleteUser = (req = request, res = response) => {
    try {
        const { id } = req.body;
        User.findOneAndDelete({ _id: id }).then(() => {
            res.status(200).json({ message: "Deleted Successfully", status: true });
        })
    } catch (error) {
        console.error(`Error While Admin Deleting a User: ${error}`);
        res.status(500).json({ message: "Error While Admin Deleting A User", status: false });
    }
}

exports.adminEdit = (req = request, res = response) => {
    try {
        const is_valid = validateWith(EditUserSchema, req.body);
        if (is_valid.status) {
            const { firstname, lastname } = req.body;
            var newupdatedata = { firstname, lastname };
            if (req.file) {
                newupdatedata["profile"] = req.file.path
            }
            User.findOneAndUpdate({ _id: req.user_id }, newupdatedata).then(data => {
                console.log(data);
                res.status(200).json({ message: "Updated successfully", data: data })
            })
        } else {
            res.status(400).json({ message: is_valid.error, status: false })
        }

    } catch (error) {
        console.error(`Error While Admin Edit: ${error}`);
        res.status(500).json({ message: "Error While Admin Edit", status: false });
    }
}

exports.createRolePermission = (req = request, res = response) => {
    try {
        const { roleId, permissions } = req.body;
        let new_permissions=permissions;
        if (typeof permissions == "string") {
            new_permissions = permissions.split(",");
        }
        RolePermission.where({ roleId: roleId }).findOne().then(data => {
            if (data) {
                res.status(200).json({ message: "This Role IS Already Setted A Permission,Please Edit a Permission", status: true });

            } else {
                const newrp = new RolePermission({
                    roleId,
                    permissions:new_permissions
                });
                newrp.populate("roleId");
                newrp.save().then(data => {
                    res.status(200).json({ message: `Permission Seted Successfully To A Role ${data.get("roleId").get("rolename")}`, status: true })
                })

            }
        })
    } catch (error) {
        console.error(`Error While Adding Permission: ${error}`);
        res.status(500).json({ message: "Error While Adding Permission", status: false });
    }
}

exports.addPermission = (req = request, res = response) => {
    try {
        const { id, permissions } = req.body;
        let new_permissions = permissions;

        if (typeof permissions == "string") {
            new_permissions = permissions.split(",");
        }
        RolePermission.findOneAndUpdate({ _id: id },
            { $addToSet: { permissions: { $each: new_permissions } } },
            { new: true }
        ).populate("roleId").then(data => {
            res.status(200).json({ message: `${data.get("roleId").get("rolename")} Permission Updated`, status: true });
        })
    } catch (error) {
        console.error(`Error While Adding Permission to a Role ${error}`);
        res.status(500).json({ message: "Error While Adding Permission to a Role", status: false });
    }
}

exports.removePermission = (req = request, res = response) => {
    try {
        const { id, permissions } = req.body;
        var new_permissions = permissions;
        console.log(typeof permissions);
        if (typeof permissions == "string") {
            new_permissions = permissions.split(",");
        }
        RolePermission.findOneAndUpdate({ _id: id },
            { $pullAll: { permissions: new_permissions } },
            { new: true }).populate("roleId")
            .then(data => {
                res.status(200).json({ message: `${data.get("roleId").get("rolename")} Permission Updated`, status: true })
            })
    } catch (error) {
        console.error(`Error While Removing Permission to a Role ${error}`);
        res.status(500).json({ message: "Error While Removing Permission to a Role", status: false });
    }
}

exports.viewAllRolePermissions=(req=request,res=response)=>{
    try {
        RolePermission.find().populate("roleId",'rolename').then(data=>{
            res.status(200).json({data,status:true});
        })
    } catch (error) {
        console.error(`Error While Removing Permission to a Role ${error}`);
        res.status(500).json({ message: "Error While Removing Permission to a Role", status: false });
    }
}

