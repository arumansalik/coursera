const { Router } = require('express');
const { userMiddleWare } = require('../middleware/user');
const { purchaseModel, courseModel } = require("../db");
const courseRoutes = Router();

courseRoutes.post("/purchase", userMiddleWare, async function(req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have successfully bought thr course"
    })
})

courseRoutes.get("/preview", async function(req, res) {
    const courses = await courseModel.find({});
    res.json({
        courses
    })
})

module.exports = ({
    courseRoutes: courseRoutes
})