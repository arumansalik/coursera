const {Router} = require("express");
const {adminModel} = require("../db");

const AdminRoutes = Router();

AdminRoutes.post("/signin", function(req, res) {
    res.json({
        message: "Signin Adminn"
    })
});

AdminRoutes.post("/signup", function(req, res) {
    res.json({
        message: "Signup Adminn"
    })
});

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