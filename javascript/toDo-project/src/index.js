import "./styles.css";
import menuSwitch from "./switchPage.js";
import ProjectsManager from "./createProject.js";
import TodoManager from "./createToDo.js";
import { isToday, isThisWeek, parseISO } from "date-fns";

const menu = new menuSwitch({
  "home-btn": document.getElementById("home-container"),
  "today-btn": document.getElementById("today-container"),
  "week-btn": document.getElementById("week-container"),
});

menu.init();

// Elements
const addProjectBtn = document.getElementById("new-project-btn");
const projectModal = document.getElementById("addProjectModal");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoModal = document.getElementById("addToDoModal");
const cancelBtns = document.querySelectorAll(".cancel-btn");

const projectForm = document.getElementById("addProjectForm");
const todoForm = document.getElementById("todo-form");
const projectSelect = document.getElementById("project-select");

// Managers
const todoManager = new TodoManager();
const projectManager = new ProjectsManager(todoManager);
// Initial Render
projectManager.renderProjects();
projectManager.projectDropdown();
todoManager.renderTasks();

// Sync projects with tasks
projectManager.renderProjects((projectId) => {
  todoManager.renderTasks(projectId);
});

// Event Listeners
addProjectBtn.addEventListener("click", () => {
  projectModal.style.display = "flex";
});

addTodoBtn.addEventListener("click", () => {
  projectManager.projectDropdown();
  todoModal.style.display = "flex";
});

cancelBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    projectForm.reset();
    todoForm.reset();
    projectModal.style.display = "none";
    todoModal.style.display = "none";
  })
);

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const projectTitle = document.getElementById("title").value.trim();

  if (projectTitle) {
    projectManager.addToLibrary(projectTitle);
  }

  projectForm.reset();
  projectModal.style.display = "none";
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskDetails = document.getElementById("todo-task").value.trim();
  const projectTask = document.getElementById("project-select").value;
  const dueDate = document.getElementById("todo-date").value;

  if (taskDetails) {
    todoManager.addOrUpdateTask(taskDetails, projectTask, dueDate);
  }

  todoForm.reset();
  document.getElementById("project-select").selectedIndex = 0;
  todoModal.style.display = "none";
});

document.getElementById("today-btn").addEventListener("click", () => {
  const todayTasks = todoManager.myTasks.filter(
    (t) => t.dueDate && isToday(parseISO(t.dueDate))
  );
  todoManager.renderTasksList(todayTasks);
});

document.getElementById("week-btn").addEventListener("click", () => {
  const weekTasks = todoManager.myTasks.filter(
    (t) => t.dueDate && isThisWeek(parseISO(t.dueDate), { weekStartsOn: 1 })
  );
  todoManager.renderTasksList(weekTasks);
});

document.getElementById("home-btn").addEventListener("click", () => {
  const allTasks = todoManager.myTasks;
  todoManager.renderTasksList(allTasks);
});
