// import dependencies
const express = require("express");
const cors = require("cors");

// import routes
const projectRoutes = require("./routes/projectRoutes");

// import config values (port and app name)
const { PORT, APP_NAME } = require("./config/envConfig");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/projects", projectRoutes);

// default route
app.get("/", (req, res) => {
  res.send(`${APP_NAME} is running`);
});

// start server
app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on port ${PORT}`);
});
