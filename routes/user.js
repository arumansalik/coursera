const { Router } = require("express");
const { userModel } = require("../db");
const {JWT_SECRET} = require("../config");
const userRoutes = Router();
const jwt = require('jsonwebtoken');

userRoutes.post("/signup", async function(req, res) {
    const {email, password, fName, lName} = req.body;
    try {
        await userModel.create({
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

userRoutes.post("/signin", async function(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    });

    if(user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        })
    } else {
    res.status(403).json({
        message: "Incorrect Credientiials"
    })
}   
})

userRoutes.post("/purchases", function(req, res) {
    res.json({
        message: "purchases endpoint"
    })
})

module.exports = {
    userRoutes : userRoutes
}