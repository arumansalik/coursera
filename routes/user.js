const { Router } = require("express");

const userRoutes = Router();

userRoutes.post("/signup", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

userRoutes.post("/signin", function(req, res) {
    res.json({
        message: "signin endpoint"
    })
})

userRoutes.post("/purchases", function(req, res) {
    res.json({
        message: "purchases endpoint"
    })
})

module.exports = {
    userRoutes : userRoutes
}