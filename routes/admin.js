const {Router} = require("express");
const {adminModel} = require("../db");
const jwt = require("jsonwebtoken");
const AdminRoutes = Router();
const JWT_SECRET_ADMIn = "ilovesalik";

AdminRoutes.post("/signup", async function(req, res) {
    const {email, password, fName, lName} = req.body;
    try {
        await adminModel.create({
            email,
            password,
            fName,
            lName
        })
    } catch(e) {
        res.json({
            message: "Signup failed"
        })
    }
    
    res.json({
        message: "signup endpoint"
    })
})

AdminRoutes.post("/signin", async function(req, res) {
    const {email, password} = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if(admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_SECRET_ADMIn);
        res.json({
            token: token
        })
    } else {
    res.status(403).json({
        message: "Incorrect Credientiials"
    })
}   
})

AdminRoutes.post("/course", function(req, res) {
    res.json({
        message: "course Adminn"
    })
});

AdminRoutes.delete("/course", function(req, res) {
    res.json({
        message: "delete course Adminn"
    })
});

AdminRoutes.post("/course", function(req, res) {
    res.json({
        message: "course Adminn"
    })
});

AdminRoutes.put("/courses", function(req, res) {
    res.json({
        message: "course Adminn"
    })
});

module.exports = {
    AdminRoutes: AdminRoutes
}