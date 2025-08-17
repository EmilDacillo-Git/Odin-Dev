import StorageHelper from "./localStorage";
import ToDoManager from "./createToDo.js";

const storageAccess = new StorageHelper();
const STORAGE_KEY = "myProjects";

class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
  }
}

class ProjectsManager {
  constructor(todoManager) {
    this.myLibrary = storageAccess.loadFromStorage(STORAGE_KEY);
    this.todoManager = todoManager;
  }

  addToLibrary(name) {
    const newProject = new Project(name);
    this.myLibrary.push(newProject);
    storageAccess.saveToStorage(STORAGE_KEY, this.myLibrary);
    this.renderProjects();
  }

  renderProjects(onProjectClick) {
    const container = document.getElementById("project-list");
    container.innerHTML = "";

    this.myLibrary.forEach((project) => {
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

      sect.addEventListener("click", () => {
        if (onProjectClick) onProjectClick(project.id);
        this.todoManager.renderTasks(project.id);
      });
    });

    this.attachDeleteEvents();
  }

  attachDeleteEvents() {
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const projId = e.target.parentElement.getAttribute("data-id");
        this.deleteProject(projId);
      });
    });
  }

  deleteProject(projId) {
    const index = this.myLibrary.findIndex((p) => p.id === projId);
    if (index !== -1) {
      this.myLibrary.splice(index, 1);
      storageAccess.saveToStorage(STORAGE_KEY, this.myLibrary);

      this.todoManager.deleteTasksByProject(projId);

      this.renderProjects();
      this.projectDropdown();
    }
  }

  projectDropdown() {
    const projectSelect = document.getElementById("project-select");
    const currentValue = projectSelect.value;
    projectSelect.innerHTML = "";

    // Add back placeholder
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a project...";
    placeholder.disabled = true;
    placeholder.selected = true;
    projectSelect.appendChild(placeholder);

    // Add "No project" option
    const noProjectOption = document.createElement("option");
    noProjectOption.value = "home";
    noProjectOption.textContent = "No Project (Home)";
    projectSelect.appendChild(noProjectOption);

    const projects = storageAccess.loadFromStorage(STORAGE_KEY);

    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.id;
      option.textContent = project.name;

      if (project.id === currentValue) {
        option.selected = true;
      }

      projectSelect.appendChild(option);
    });
    if (!currentValue) {
      placeholder.selected = true;
    }
  }

  selectProject(projectId) {
    localStorage.setItem("selectedProject", projectId);

    const event = new CustomEvent("projectSelected", { detail: projectId });
    document.dispatchEvent(event);
  }
}

export default ProjectsManager;
