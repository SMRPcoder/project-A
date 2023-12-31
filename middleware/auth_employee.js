const fs = require("fs");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const User = require("../models/User");

const auth_employee = (req = request, res = response, next) => {

    try {
        const { authorization } = req.headers;
        if (authorization) {
            const token = authorization.split(" ")[1];
            const private = fs.readFileSync('private.key');
            const { email, role, roleId, _id } = jwt.verify(token, private, { algorithms: "RS256" });
            if (role == "ADMIN" || role == "EMPLOYEE") {
                User.where({ _id: _id }).findOne().then(data => {
                    if (data) {
                        req.email = email;
                        req.user_id = _id;
                        req.roleId = roleId;
                        req.role = role;
                        next();
                    } else {
                        res.status(401).json({ message: "UnAuthorized Token Provided", status: false })
                    }
                })
            } else {
                res.status(401).json({ message: "You ARe Not Allowed", status: false })
            }
        } else {
            res.status(401).json({ message: "Token Not Provided", status: false })
        }

    } catch (error) {
        console.error(`Error Occured In middleware- Error : ${error}`)
        res.status(500).json({ message: "Error", status: false });
    }

}

module.exports=auth_employee;