const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth");
const organisationRoutes = require("./routes/organisation");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.use("/organisation", organisationRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

// Custom Middlewares - Error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ error: err.message });
    return;
  }
  next();
});

//DB connections
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("DB CONNECTED!!");
});

// PORT
const port = process.env.PORT || 5000;

//Start server
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});
