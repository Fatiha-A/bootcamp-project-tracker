const service = require("../services/projectService");

function getProjects(req, res) {
  res.json(service.getAllProjects());
}

function getProject(req, res) {
  const project = service.getProjectById(Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
}

function createProject(req, res) {
  const newProject = service.addProject(req.body);
  res.status(201).json(newProject);
}

function updateProject(req, res) {
  const updated = service.updateProject(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ error: "Project not found" });
  res.json(updated);
}

function deleteProject(req, res) {
  const deleted = service.deleteProject(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Project not found" });
  res.json(deleted);
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
