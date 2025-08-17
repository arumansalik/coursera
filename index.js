require('dotenv').config();

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
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listening on port 3000");
}

main();