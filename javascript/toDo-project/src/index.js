import "./styles.css";
import menuSwitch from "./switchPage.js";
import ProjectsManager from "./createProject.js";

const menu = new menuSwitch({
  "home-btn": document.getElementById("home-container"),
  "today-btn": document.getElementById("today-container"),
  "week-btn": document.getElementById("week-container"),
  "notes-btn": document.getElementById("notes-container"),
});
const addProjectBtn = document.getElementById("new-project-btn");
const projectModal = document.getElementById("addProjectModal");
const cancelBtn = document.getElementById("cancel-btn");
const projectForm = document.getElementById("addProjectForm");
const projectContainer = document.getElementById("project-list");

menu.init();

// Event Listeners
addProjectBtn.addEventListener("click", () => {
  projectModal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  projectForm.reset();
  projectModal.style.display = "none";
});

projectForm.addEventListener("submit", (event) => {
  const projectManager = new ProjectsManager();
  const projectTitle = document.getElementById("title").value.trim();

  projectManager.addToLibrary(projectTitle);
  projectForm.reset();
  projectManager.renderProjects();
  projectModal.style.display = "none";
});
