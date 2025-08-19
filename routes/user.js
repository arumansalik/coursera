const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const {JWT_SECRET} = require("../config");
const userRoutes = Router();
const jwt = require('jsonwebtoken');
const { userMiddleWare } = require("../middleware/user");
const course = require("./course");

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

userRoutes.get("/purchases", userMiddleWare, async   function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });

    const coursesData = await courseModel.find({
        _id: {$in: purchases.map(x => x.courseId)}
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRoutes : userRoutes
}