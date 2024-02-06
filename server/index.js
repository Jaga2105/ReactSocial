require('dotenv').config()
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/authRoute')
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")

app.use(express.json({ limit: '5mb' }))
app.use(cors())


app.use(cookieParser());

 
// Routes
// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute)
// app.use("/api/post", postRoute)
app.use("/auth", authRoute);
app.use("/user", userRoute)
app.use("/post", postRoute)

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5001, console.log("Server listening at port 5001"));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
