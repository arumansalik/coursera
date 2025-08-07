const { Router } = require('express');

const courseRoutes = Router();

courseRoutes.post("/purchase", function(req, res) {
    res.json({
        message: "purschase endpoint"
    })
})

courseRoutes.get("/preview", function(req, res) {
    res.json({
        message: "preview endpoint"
    })
})

module.exports = ({
    courseRoutes: courseRoutes
})