const projectForm = document.getElementById("project-form");
const projectList = document.getElementById("project-list");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const submitBtn = projectForm.querySelector("button[type='submit']");

const API_URL = "http://localhost:3000/api/projects";

async function fetchProjects() {
  try {
    const res = await fetch(API_URL);
    const projects = await res.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

function displayProjects(projects) {
  projectList.innerHTML = ""; // Clear previous list

  projects.forEach((project) => {
    const div = document.createElement("div");
    div.className = "project-item";
    div.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <p>Status: <strong>${project.status}</strong></p>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    `;

    div.querySelector(".delete-button").addEventListener("click", async () => {
      if (!window.confirm(`Are you sure you want to delete "${project.name}"?`))
        return;

      try {
        const res = await fetch(`${API_URL}/${project.id}`, {
          method: "DELETE",
        });
        if (res.ok) fetchProjects();
        else console.error("Failed to delete project");
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    });

    div.querySelector(".edit-button").addEventListener("click", () => {
      document
        .querySelectorAll(".project-item")
        .forEach((p) => (p.style.backgroundColor = "#fff"));

      div.style.backgroundColor = "#fff9c4";

      submitBtn.textContent = "Edit Project";

      nameInput.value = project.name;
      descriptionInput.value = project.description;
      statusInput.value = project.status;

      projectForm.removeEventListener("submit", addProjectHandler);

      projectForm.addEventListener("submit", async function editHandler(e) {
        e.preventDefault();

        const updatedProject = {
          name: nameInput.value.trim(),
          description: descriptionInput.value.trim(),
          status: statusInput.value,
        };

        try {
          const res = await fetch(`${API_URL}/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProject),
          });

          if (res.ok) {
            nameInput.value = "";
            descriptionInput.value = "";
            statusInput.value = "ongoing";

            submitBtn.textContent = "Add Project";
            fetchProjects();

            projectForm.removeEventListener("submit", editHandler);
            projectForm.addEventListener("submit", addProjectHandler);
          } else {
            console.error("Failed to update project");
          }
        } catch (error) {
          console.error("Error updating project:", error);
        }
      });
    });

    projectList.appendChild(div);
  });
}

async function addProjectHandler(e) {
  e.preventDefault();

  const newProject = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    status: statusInput.value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    if (res.ok) {
      nameInput.value = "";
      descriptionInput.value = "";
      statusInput.value = "ongoing";
      fetchProjects();
    } else {
      console.error("Failed to add project");
    }
  } catch (error) {
    console.error("Error adding project:", error);
  }
}

projectForm.addEventListener("submit", addProjectHandler);
fetchProjects();
