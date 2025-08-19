//Select elements
const projectForm = document.getElementById("project-form");
const projectList = document.getElementById("project-list");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const submitButton = projectForm.querySelector("button[type='submit']");

//Backend URL
const API_URL = "http://localhost:3000/api/projects";

//Function to fech all projects
async function fetchProjects() {
  try {
    const res = await fetch(API_URL);
    const projects = await res.json();
    displayProjects(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

//Function to disply projects
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
    //Delete project
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

    //Edit project
    div.querySelector(".edit-button").addEventListener("click", () => {
      //Remove previous highlits
      document
        .querySelectorAll(".project-item")
        .forEach((p) => (p.style.backgroundColor = "#fff"));

      //Highlight the project being edited
      div.style.backgroundColor = "#fff9c4";

      //Change submit button text
      submitButton.textContent = "Edit Project";

      //Prefill form ith the project data
      nameInput.value = project.name;
      descriptionInput.value = project.description;
      statusInput.value = project.status;

      //Remove old subbmit listener
      projectForm.removeEventListener("submit", addProjectHandler);

      //Add edit submit listener
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

            submitButton.textContent = "Add Project";
            fetchProjects();

            //Remove edit listemner and restore add listenr
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

//Handler for add project
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

//Initial load
projectForm.addEventListener("submit", addProjectHandler);
fetchProjects();
