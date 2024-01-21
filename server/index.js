require('dotenv').config()
const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/authRoute')
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")

app.use(express.json({ limit: '5mb' }))
app.use(cors())
 
// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, console.log("Server listening at port 5000"));
