const express = require('express'); 
const app = express();
app.use(express.json());
const { userRoutes } = require('./routes/user'); 
const { courseRoutes } = require('./routes/course'); 
const {AdminRoutes} = require('./routes/admin');
const { default: mongoose } = require('mongoose');
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/admin", AdminRoutes);

async function main() {
    await mongoose.connect('mongodb+srv://admin:KJIBcmmiPhuqeLlC@cluster0.4gpl4ag.mongodb.net/coursera-app');
    app.listen(3000);
    console.log("listening on port 3000");
}

main();