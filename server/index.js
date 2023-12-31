require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/authRoute')

app.use(express.json({ limit: '5mb' }))
 
// Routes
app.use("/api/auth", authRoute);

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, console.log("Server listening at port 5000"));
