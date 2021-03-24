var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByClassName("_btn-edit")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "task";

  var checkBox = document.createElement("input"); 
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";

  var label = document.createElement("label"); 
  label.className = "task__label";
  
  var editInput = document.createElement("input"); 
  editInput.type = "text";
  editInput.className = "task__text-input";
  
  var editButton = document.createElement("button"); 

  var deleteButton = document.createElement("button"); 
  var deleteButtonImg = document.createElement("img"); 
  deleteButtonImg.alt = "remove task icon";

  label.innerText = taskString;

  editButton.innerText = "Edit"; 
  editButton.className = "_btn-edit";

  deleteButton.innerText = "Delete";
  deleteButton.className = "_btn-delete";
  deleteButtonImg.src = "./assets/remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  console.log("Add Task...");

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".task__text-input");
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector("._btn-edit");
  var containsClass = listItem.classList.contains("_edit-mode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("_edit-mode");
};

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector("._btn-edit");
  var deleteButton = taskListItem.querySelector("._btn-delete");

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) { 
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) { 
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}