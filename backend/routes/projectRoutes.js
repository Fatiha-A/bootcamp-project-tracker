const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectController");

router.get("/", controller.getProjects);
router.get("/:id", controller.getProject);
router.post("/", controller.createProject);
router.put("/:id", controller.updateProject);
router.delete("/:id", controller.deleteProject);

module.exports = router;
