import StorageHelper from "./localStorage";
const storageAccess = new StorageHelper();
const STORAGE_KEY = "myToDos";

class Todo {
  constructor(task, projectId, dueDate = "") {
    this.id = crypto.randomUUID();
    this.task = task;
    this.projectId = projectId;
    this.dueDate = dueDate;
  }
}

class TodoManager {
  constructor() {
    this.myTasks = storageAccess.loadFromStorage(STORAGE_KEY);
    this.editingTaskId = null;
    this.eventsAttached = false;
  }

  addOrUpdateTask(name, projectId, dueDate) {
    if (this.editingTaskId) {
      // Update mode
      const task = this.myTasks.find((t) => t.id === this.editingTaskId);
      if (task) {
        task.task = name;
        task.projectId = projectId;
        task.dueDate = dueDate;
      }
      this.editingTaskId = null;
    } else {
      // Add mode
      const newTask = new Todo(name, projectId, dueDate);
      this.myTasks.push(newTask);
    }

    storageAccess.saveToStorage(STORAGE_KEY, this.myTasks);
    this.renderTasks(projectId);
  }

  renderTasks(projectId = null) {
    const container = document.getElementById("todo-container");
    container.innerHTML = "";

    let tasksToShow = this.myTasks;
    if (projectId && projectId !== "") {
      tasksToShow = this.myTasks.filter((task) => task.projectId === projectId);
    } else if (projectId === "") {
      // Show only tasks with no project
      tasksToShow = this.myTasks.filter((task) => !task.projectId);
    }

    tasksToShow.forEach((task) => {
      container.appendChild(this.createTaskElement(task));
    });

    if (!this.eventsAttached) {
      this.attachEvents();
      this.eventsAttached = true;
    }
  }

  renderTasksList(tasks) {
    const container = document.getElementById("todo-container");
    container.innerHTML = "";

    tasks.forEach((task) => {
      container.appendChild(this.createTaskElement(task));
    });

    // ✅ No need to reattach events – event delegation already handles clicks
    if (!this.eventsAttached) {
      this.attachEvents();
      this.eventsAttached = true;
    }
  }

  createTaskElement(task) {
    const sect = document.createElement("div");
    sect.classList.add("todo-sect");
    sect.setAttribute("data-id", task.id);

    const sectDetails = document.createElement("div");
    sectDetails.classList.add("todo-detail");

    const details = document.createElement("p");
    details.classList.add("todo-details");
    details.textContent = task.task;

    const due = document.createElement("p");
    due.classList.add("todo-due");
    due.textContent = task.dueDate;

    const sectAction = document.createElement("div");
    sectAction.classList.add("todo-action");

    const editIcon = document.createElement("span");
    editIcon.classList.add("mdi", "mdi-square-edit-outline", "edit-task");

    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("mdi", "mdi-delete-outline", "remove-task");

    sectDetails.appendChild(details);
    sectDetails.appendChild(due);
    sectAction.appendChild(editIcon);
    sectAction.appendChild(deleteIcon);
    sect.appendChild(sectDetails);
    sect.appendChild(sectAction);

    return sect;
  }

  attachEvents() {
    const container = document.getElementById("todo-container");

    container.addEventListener("click", (e) => {
      const taskID = e.target.closest(".todo-sect")?.getAttribute("data-id");
      if (!taskID) return;

      if (e.target.classList.contains("remove-task")) {
        this.deleteTask(taskID);
      }

      if (e.target.classList.contains("edit-task")) {
        this.startEditing(taskID);
      }
    });
  }

  startEditing(taskID) {
    const task = this.myTasks.find((t) => t.id === taskID);
    if (!task) return;

    this.editingTaskId = taskID;

    const form = document.getElementById("todo-form");
    const formModal = document.getElementById("addToDoModal");
    const taskInput = form.querySelector("#todo-task");
    const projectSelect = form.querySelector("#project-select");
    const dueDateInput = form.querySelector("#todo-date");

    taskInput.value = task.task;
    projectSelect.value = task.projectId;
    dueDateInput.value = task.dueDate;

    formModal.style.display = "flex";
  }

  deleteTask(taskID) {
    const index = this.myTasks.findIndex((t) => t.id === taskID);
    if (index !== -1) {
      const deletedTask = this.myTasks[index];
      this.myTasks.splice(index, 1);
      storageAccess.saveToStorage(STORAGE_KEY, this.myTasks);
      this.renderTasks(deletedTask.projectId);
    }
  }
  deleteTasksByProject(projectId) {
    this.myTasks = this.myTasks.filter((t) => t.projectId !== projectId);
    storageAccess.saveToStorage(STORAGE_KEY, this.myTasks);
    this.renderTasks();
  }
}

export default TodoManager;
