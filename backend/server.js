require("dotenv").config();

const express = require("express");
const cors = require("cors"); //depenenies

const projectRoutes = require("./routes/projectRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send(`${process.env.APP_NAME} is running`);
});

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} listening on port ${PORT}`);
});
