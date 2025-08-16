const myLibrary = [];

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}

class ProjectsManager {
  addToLibrary(name) {
    const newProject = new Project(name);
    myLibrary.push(newProject);
    this.renderProjects();
  }

  renderProjects() {
    const container = document.getElementById("project-list");
    container.innerHTML = "";

    myLibrary.forEach((project) => {
      const sect = document.createElement("a");
      sect.classList.add("project-card");
      sect.href = "#";
      sect.setAttribute("data-id", project.id);

      const title = document.createElement("h3");
      title.classList.add("project-title");
      title.textContent = project.name;

      const deleteIcon = document.createElement("span");
      deleteIcon.classList.add("mdi", "mdi-delete-outline", "remove-btn");

      sect.appendChild(title);
      sect.appendChild(deleteIcon);
      container.appendChild(sect);
    });

    // re-bind delete events after rendering
    this.attachDeleteEvents();
  }

  attachDeleteEvents() {
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const projId = e.target.parentElement.getAttribute("data-id");
        this.deleteProject(projId);
      });
    });
  }

  deleteProject(projId) {
    const index = myLibrary.findIndex((p) => p.id === projId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      this.renderProjects();
    }
  }
}

export default ProjectsManager;
