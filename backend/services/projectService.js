const projects = require("../data/projectData");

function getAllProjects() {
  return projects;
}

function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

function addProject(project) {
  const newProject = { id: Date.now(), ...project };
  projects.push(newProject);
  return newProject;
}

function updateProject(id, data) {
  const project = projects.find((p) => p.id === id);
  if (project) {
    project.name = data.name;
    project.description = data.description;
    project.status = data.status;
    return project;
  }
  return null;
}

function deleteProject(id) {
  const index = projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    return projects.splice(index, 1)[0];
  }
  return null;
}

module.exports = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
