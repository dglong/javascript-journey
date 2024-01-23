const todoInputElement = document.getElementById("todo-input");
const todoListElement = document.getElementById("todo-list");
let todoList = [];

// Initialize app
appInitialize();

function appInitialize() {
  getTodoListFromLocalStorage();
  console.log("Loaded List:", todoList);
  for (todoItem of todoList) {
    addTodoItemElement(todoItem);
  }
}

todoInputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todoInputElement.value ? addTodoItem(todoInputElement.value) : null;
    todoInputElement.value = "";
  }
});

function addTodoItem(value) {
  // Set up todoItem
  let todoItem = {
    id: Date.now(),
    label: value,
    status: "not-finished",
  };
  todoList.push(todoItem);

  // Set up todoItemELement
  addTodoItemElement(todoItem);

  // Save data
  saveTodoListToLocalStorage();

  console.log(todoList);
}

function addTodoItemElement(todoItem) {
  let todoItemElement = document.createElement("div");
  todoItemElement.className = "todo-item";
  todoItemElement.innerText = todoItem.label;
  todoItemElement.id = `todo-item-${todoItem.id}`;
  todoItemElement.addEventListener("dblclick", onTodoItemClick);
  todoListElement.insertBefore(todoItemElement, todoListElement.firstChild);
}

function onTodoItemClick(e) {
  const itemId = parseInt(e.target.id.replace("todo-item-", ""));
  todoList.map((todoItem) => {
    if (todoItem.id === itemId) {
      console.log("Get item!", todoItem);
      onTodoItemEditMode(todoItem);
    }
  });
}

function onTodoItemEditMode(todoItem) {
  const todoItemElement = document.getElementById(`todo-item-${todoItem.id}`);

  // Disable todoItem eventListener
  todoItemElement.removeEventListener("dblclick", onTodoItemClick);

  // Hide
  todoItemElement.innerText = "";

  // Add input for edit mode
  let inputTodoItemElement = document.createElement("input");
  inputTodoItemElement.className = "todo-item__edit";
  inputTodoItemElement.value = todoItem.label;
  todoItemElement.append(inputTodoItemElement);
  inputTodoItemElement.focus();

  // Bind event listener
  inputTodoItemElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      confirmEditTodoItem(todoItem, todoItemElement, inputTodoItemElement);
    } else if (e.key === "Escape") {
      revertTodoItem(todoItem, todoItemElement, inputTodoItemElement);
    }
  });
  inputTodoItemElement.addEventListener("focusout", () => {
    revertTodoItem(todoItem, todoItemElement, inputTodoItemElement);
  });
}

function confirmEditTodoItem(todoItem, todoItemElement, inputTodoItemElement) {
  const newValue = inputTodoItemElement.value;
  todoItem.label = newValue;
  todoItemElement.innerText = newValue;
  todoItemElement.addEventListener("dblclick", onTodoItemClick);
  saveTodoListToLocalStorage();
  inputTodoItemElement.remove();
}

function revertTodoItem(todoItem, todoItemElement, inputTodoItemElement) {
  todoItemElement.innerText = todoItem.label;
  todoItemElement.addEventListener("dblclick", onTodoItemClick);
  inputTodoItemElement ? inputTodoItemElement.remove() : null;
}

function saveTodoListToLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

function getTodoListFromLocalStorage() {
  todoList = JSON.parse(localStorage.getItem("todo-list")) ?? [];
}
