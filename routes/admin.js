const {Router} = require("express");
const {adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const AdminRoutes = Router();
const {JWT_SECRET_ADMIN} = require("../config");
const { adminMiddleWare } = require("../middleware/admin");


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
        }, JWT_SECRET_ADMIN);
        res.json({
            token: token
        })
    } else {
    res.status(403).json({
        message: "Incorrect Credientiials"
    })
}   
})

AdminRoutes.post("/course", adminMiddleWare, async function(req, res) {
    const adminId = req.userId;

    const {title, descrption, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title, 
        descrption: descrption,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
      
    res.json({
        message: "course Created",
        courseId: course._id
    })
});


AdminRoutes.put("/course", async function(req, res) {
    const adminId = req.userId;

    const {title, descrption, imageUrl, price, courseId} = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title, 
        descrption: descrption,
        imageUrl: imageUrl,
        price: price
    })
    res.json({
        message: "course Updated ",
        courseId: course._id
    })
});


AdminRoutes.get("/course/bulk", adminMiddleWare, async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        
        creatorId: adminId
    });

    res.json({
        message: "Courses fetched",
        courses
    });
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



module.exports = {
    AdminRoutes: AdminRoutes
}